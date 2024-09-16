import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [10,"Title must contain at least 10 characters!"],
        maxLength: [40, "Title cannot exceed 40 characters"],
    },
    mainImage: {
        public_id:{
            type: String,
            require: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    intro: {
        type: String,
        required: true,
        minLength: [150,"Blog intro must contain at least 150 characters!"],
    },

    paraOneImage: {
        public_id:{
            type: String,
        },
        url:{
            type: String,
        },
    },
    paraOneDescription: {
        type: String,
        minLength: [50,"Pragraph must contain at least 50 characters!"],
    },
    paraOneTitle: {
        type: String,
        minLength: [10,"Pragraph title must contain at least 10 characters!"],
    },


    paraTwoImage: {
        public_id:{
            type: String,
        },
        url:{
            type: String,
        },
    },
    paraTwoDescription: {
        type: String,
        minLength: [50,"Pragraph must contain at least 50 characters!"],
    },
    paraTwoTitle: {
        type: String,
        minLength: [10,"Pragraph title must contain at least 10 characters!"],
    },



    paraThreeImage: {
        public_id:{
            type: String,
        },
        url:{
            type: String,
        },
    },
    paraThreeDescription: {
        type: String,
        minLength: [50,"Pragraph must contain at least 50 characters!"],
    },
    paraThreeTitle: {
        type: String,
        minLength: [10,"Pragraph title must contain at least 10 characters!"],
    },

    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    }
});

export const Blog = new mongoose.model("Blog", blogSchema);