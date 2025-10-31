import userModel from "../models/userModel.js";
import imageModel from "../models/imageModel.js";
import FormData from "form-data";
import axios from "axios";
import cloudinary from "../config/cloudinary.js";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.id;
    // Validate input
    if (!userId || !prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "No Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Send request to ClipDrop API
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert image to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(resultImage, {
      folder: 'imagify_generations',
      resource_type: 'image',
      public_id: `${userId}_${Date.now()}`
    });

    // Save image metadata to database
    const newImage = new imageModel({
      userId: user._id,
      prompt: prompt,
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id
    });
    await newImage.save();

    // Update user's credit balance
    const updatedBalance = user.creditBalance - 1;
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: updatedBalance,
    });

    // Send response
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedBalance,
      resultImage: uploadResult.secure_url,
      imageId: newImage._id
    });
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user's image gallery
export const getUserImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { favorite, limit = 50, skip = 0 } = req.query;

    // Build query
    const query = { userId };
    if (favorite === 'true') {
      query.isFavorite = true;
    }

    // Get images with pagination
    const images = await imageModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await imageModel.countDocuments(query);

    res.json({
      success: true,
      images,
      total,
      hasMore: total > parseInt(skip) + images.length
    });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle favorite status
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId } = req.body;

    const image = await imageModel.findOne({ _id: imageId, userId });

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    image.isFavorite = !image.isFavorite;
    await image.save();

    res.json({
      success: true,
      message: image.isFavorite ? "Added to favorites" : "Removed from favorites",
      isFavorite: image.isFavorite
    });
  } catch (err) {
    console.error("Error toggling favorite:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId } = req.params;

    const image = await imageModel.findOne({ _id: imageId, userId });

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from database
    await imageModel.findByIdAndDelete(imageId);

    res.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Bulk delete images
export const bulkDeleteImages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageIds } = req.body;

    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid image IDs" });
    }

    // Find all images belonging to user
    const images = await imageModel.find({ _id: { $in: imageIds }, userId });

    if (images.length === 0) {
      return res.status(404).json({ success: false, message: "No images found" });
    }

    // Delete from Cloudinary
    const deletePromises = images.map(image => 
      cloudinary.uploader.destroy(image.cloudinaryId)
    );
    await Promise.all(deletePromises);

    // Delete from database
    await imageModel.deleteMany({ _id: { $in: imageIds }, userId });

    res.json({
      success: true,
      message: `${images.length} image(s) deleted successfully`,
      deletedCount: images.length
    });
  } catch (err) {
    console.error("Error bulk deleting images:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
