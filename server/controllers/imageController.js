import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

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
      resultImage,
    });
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
