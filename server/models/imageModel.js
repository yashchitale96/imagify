import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    prompt: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Create compound index for efficient queries
imageSchema.index({ userId: 1, createdAt: -1 });
imageSchema.index({ userId: 1, isFavorite: 1 });

const imageModel = mongoose.models.image || mongoose.model("image", imageSchema);

export default imageModel;
