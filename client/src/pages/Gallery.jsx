import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Gallery = () => {
  const { backendUrl, token, user } = useContext(AppContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}api/image/gallery?favorite=${filterFavorites}`,
        { headers: { token } }
      );

      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
      toast.error(err.response?.data?.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filterFavorites]);

  // Toggle favorite
  const toggleFavorite = async (imageId, e) => {
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        `${backendUrl}api/image/toggle-favorite`,
        { imageId },
        { headers: { token } }
      );

      if (data.success) {
        setImages((prev) =>
          prev.map((img) =>
            img._id === imageId ? { ...img, isFavorite: data.isFavorite } : img
          )
        );
        toast.success(data.message);
      }
    } catch (err) {
      console.error("Toggle favorite error:", err);
      toast.error("Failed to update favorite");
    }
  };

  // Delete single image
  const deleteImage = async (imageId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}api/image/delete/${imageId}`,
        { headers: { token } }
      );

      if (data.success) {
        setImages((prev) => prev.filter((img) => img._id !== imageId));
        toast.success(data.message);
        setViewImage(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete image");
    }
  };

  // Bulk delete
  const bulkDelete = async () => {
    if (selectedImages.length === 0) {
      toast.error("Please select images to delete");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedImages.length} image(s)?`
      )
    )
      return;

    try {
      const { data } = await axios.post(
        `${backendUrl}api/image/bulk-delete`,
        { imageIds: selectedImages },
        { headers: { token } }
      );

      if (data.success) {
        setImages((prev) =>
          prev.filter((img) => !selectedImages.includes(img._id))
        );
        setSelectedImages([]);
        setDeleteMode(false);
        toast.success(data.message);
      }
    } catch (err) {
      console.error("Bulk delete error:", err);
      toast.error("Failed to delete images");
    }
  };

  // Toggle image selection
  const toggleSelection = (imageId) => {
    setSelectedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Download image
  const downloadImage = (imageUrl, prompt) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `imagify_${prompt.slice(0, 30)}_${Date.now()}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600">
            You need to be logged in to view your gallery
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen py-10"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
          My Gallery
        </h1>
        <p className="text-gray-600 text-center text-lg">
          All your AI-generated masterpieces
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8 bg-white/50 backdrop-blur-md p-4 rounded-2xl shadow-lg">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              filterFavorites
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-400"
            }`}
          >
            {filterFavorites ? "⭐ Favorites" : "Show Favorites"}
          </button>

          <button
            onClick={() => {
              setDeleteMode(!deleteMode);
              setSelectedImages([]);
            }}
            className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
              deleteMode
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-400"
            }`}
          >
            {deleteMode ? "Cancel" : "Select Multiple"}
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <span className="text-gray-700 font-medium">
            {images.length} Image{images.length !== 1 ? "s" : ""}
          </span>

          {deleteMode && selectedImages.length > 0 && (
            <button
              onClick={bulkDelete}
              className="bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg"
            >
              Delete {selectedImages.length} Selected
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your gallery...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && images.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[40vh] bg-white/50 backdrop-blur-md rounded-3xl p-12"
        >
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {filterFavorites ? "No Favorites Yet" : "No Images Yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {filterFavorites
              ? "Start favoriting images to see them here"
              : "Generate your first AI image to get started"}
          </p>
          {!filterFavorites && (
            <a
              href="/result"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
            >
              Generate Image
            </a>
          )}
        </motion.div>
      )}

      {/* Gallery Grid */}
      {!loading && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedImages.includes(image._id)
                  ? "ring-4 ring-purple-500"
                  : ""
              }`}
              onClick={() =>
                deleteMode ? toggleSelection(image._id) : setViewImage(image)
              }
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium line-clamp-2 mb-2">
                    {image.prompt}
                  </p>
                  <p className="text-white/70 text-xs">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Favorite Button */}
              {!deleteMode && (
                <button
                  onClick={(e) => toggleFavorite(image._id, e)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <span className="text-xl">
                    {image.isFavorite ? "⭐" : "☆"}
                  </span>
                </button>
              )}

              {/* Selection Checkbox */}
              {deleteMode && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image._id)}
                    onChange={() => toggleSelection(image._id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {viewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setViewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={viewImage.imageUrl}
                  alt={viewImage.prompt}
                  className="w-full h-auto rounded-t-3xl"
                />
                <button
                  onClick={() => setViewImage(null)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-100 transition-all duration-300 shadow-lg"
                >
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Prompt
                </h3>
                <p className="text-gray-700 mb-4 bg-gray-50 p-4 rounded-xl">
                  {viewImage.prompt}
                </p>

                <p className="text-sm text-gray-500 mb-6">
                  Generated on{" "}
                  {new Date(viewImage.createdAt).toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() =>
                      downloadImage(viewImage.imageUrl, viewImage.prompt)
                    }
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12l-5-5h3V3h4v4h3l-5 5zm-7 7v-3h14v3H3z" />
                    </svg>
                    Download
                  </button>

                  <button
                    onClick={(e) => toggleFavorite(viewImage._id, e)}
                    className="px-6 py-3 rounded-full font-semibold border-2 border-purple-300 hover:border-purple-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="text-xl">
                      {viewImage.isFavorite ? "⭐" : "☆"}
                    </span>
                    {viewImage.isFavorite ? "Favorited" : "Favorite"}
                  </button>

                  <button
                    onClick={() => deleteImage(viewImage._id)}
                    className="px-6 py-3 rounded-full font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Gallery;
