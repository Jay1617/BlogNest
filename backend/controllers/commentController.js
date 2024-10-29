// controllers/commentController.js
import { Comment } from "../models/commentSchema.js";
import { Blog } from "../models/blogSchema.js";

export const createComment = async (req, res, next) => {
    const { blogId, content } = req.body;

    try {
        const comment = await Comment.create({
            blog: blogId,
            user: req.user._id,
            content,
        });

        await Blog.findByIdAndUpdate(blogId, { $push: { comments: comment._id } });

        res.status(201).json({ success: true, comment });
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId })
            .populate("user", "name avatar.url")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, comments });
    } catch (error) {
        next(error);
    }
};
