// models/commentSchema.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: [1, "Comment cannot be empty"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Comment = mongoose.model("Comment", commentSchema);
