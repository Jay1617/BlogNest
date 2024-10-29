import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import cloudinary from "cloudinary";
import { Comment } from "../models/commentSchema.js";
// import { runAnalysis } from "../path/to/your/MLFunction.js";

export const blogpost = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Blog Main Image Is Mandtory!", 400));
    }
    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;

    if (!mainImage) {
        return next(new ErrorHandler("Blog Main Image Is Mandtory!", 400));
    }

    const allowedFormates = ["image/png", "image/jpeg", "image/webp"];

    if (
        !allowedFormates.includes(mainImage.mimetype) ||
        (paraOneImage && !allowedFormates.includes(paraOneImage.mimetype)) ||
        (paraTwoImage && !allowedFormates.includes(paraTwoImage.mimetype)) ||
        (paraThreeImage && !allowedFormates.includes(paraThreeImage.mimetype))
    ) {
        return next(new ErrorHandler("Invalid file type. Only JPG, PNG, WEBP formats are allowed.", 400));
    }

    const {
        title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        category,
        published,
    } = req.body;

    const createdBy = req.user._id;
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar.url;

    if (!title || !category || !intro) {
        return next(new ErrorHandler("Title, Intro and category are required fields.", 400));
    }

    // cloudinary.Uploader.upload(mainImage.tempFilePath);
    let paraOneImageRes = {};
    let paraTwoImageRes = {};
    let paraThreeImageRes = {};

    const mainImageRes = await cloudinary.uploader.upload(
        mainImage.tempFilePath
    );
    if (paraOneImage) {
        paraOneImageRes = await cloudinary.uploader.upload(
            paraOneImage.tempFilePath
        );
    }

    if (paraTwoImage) {
        paraTwoImageRes = await cloudinary.uploader.upload(
            paraTwoImage.tempFilePath
        );
    }

    if (paraThreeImage) {
        paraThreeImageRes = await cloudinary.uploader.upload(
            paraThreeImage.tempFilePath
        );
    }

    // const uploadPromises = [
    //     paraOneImage ? cloudinary.Uploader.upload(paraOneImage.tempFilePath) : Promise.resolve(null),
    //     paraTwoImage ? cloudinary.Uploader.upload(paraTwoImage.tempFilePath) : Promise.resolve(null),
    //     paraThreeImage ? cloudinary.Uploader.upload(paraThreeImage.tempFilePath) : Promise.resolve(null),
    // ];

    // const [paraOneImageRes, paraTwoImageRes, paraThreeImageRes] = await Promise.all(uploadPromises);

    // console.log(mainImageRes);

    if (!mainImageRes ||
        mainImageRes.error ||
        (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) ||
        (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error)) ||
        (paraThreeImage && (!paraThreeImageRes || paraThreeImageRes.error))
    ) {
        return next(new ErrorHandler("Error occured while one or more image uploading!", 500));
    }


    const BlogData = {
        title,
        intro,
        paraOneDescription,
        paraOneTitle,
        paraTwoDescription,
        paraTwoTitle,
        paraThreeDescription,
        paraThreeTitle,
        category,
        createdBy,
        authorAvatar,
        authorName,
        published,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url,
        },
    };

    if (paraOneImageRes) {
        BlogData.paraOneImage = {
            public_id: paraOneImageRes.public_id,
            url: paraOneImageRes.secure_url,
        }
    };

    if (paraTwoImageRes) {
        BlogData.paraTwoImage = {
            public_id: paraTwoImageRes.public_id,
            url: paraTwoImageRes.secure_url,
        }
    };

    if (paraThreeImageRes) {
        BlogData.paraThreeImage = {
            public_id: paraThreeImageRes.public_id,
            url: paraThreeImageRes.secure_url,
        }
    };

    const blog = await Blog.create(BlogData);
    res.status(200).json({
        success: true,
        message: "Blog Uploaded",
        blog,
    });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found!", 404));
    }
    await blog.deleteOne();
    res.status(200).json({
        success: true,
        message: "Blog deleted!",
    })
});

export const getAllBlogs = catchAsyncError(async (req, res, next) => {
    const allBlogs = await Blog.find({ published: true });
    res.status(200).json({
        success: true,
        allBlogs,
    })
});

export const getSingleBlog = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id); 
    if (!blog) {
        return next(new ErrorHandler("Blog not found!"), 404);
    }
    res.status(200).json({
        status: true,
        blog,
    });
};

  

export const getMyBlogs = catchAsyncError(async (req, res, next) => {
    const createdBy = req.user._id;
    const blogs = await Blog.find({ createdBy });
    if (blogs.length === 0) {
        return next(new ErrorHandler("No blogs created by this athor"), 400);
    }
    res.status(200).json({
        status: true,
        blogs,
    });
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let blog = Blog.findById(id);
    if (!blog) {
        return next(new ErrorHandler("Blog not found!"), 404);
    }
    const newBlogData = {
        title: req.body.title,
        intro: req.body.intro,
        category: req.body.category,
        paraOneTitle: req.body.paraOneTitle,
        paraOneDescription: req.body.paraOneDescription,
        paraTwoTitle: req.body.paraTwoTitle,
        paraTwoDescription: req.body.paraTwoDescription,
        paraThreeTitle: req.body.paraThreeTitle,
        paraThreeDescription: req.body.paraThreeDescription,
        published: req.body.published,
    };

    if (req.files) {
        const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;
        const allowedFormates = ["image/png", "image/jpeg", "image/webp"];

        if (
            (mainImage && !allowedFormates.includes(mainImage.mimetype)) ||
            (paraOneImage && !allowedFormates.includes(paraOneImage.mimetype)) ||
            (paraTwoImage && !allowedFormates.includes(paraTwoImage.mimetype)) ||
            (paraThreeImage && !allowedFormates.includes(paraThreeImage.mimetype))
        ) {
            return next(new ErrorHandler("Invalid file type. Only JPG, PNG, WEBP formats are allowed.", 400));
        }

        if (req.files && mainImage) {
            const blogMainImageId = blog.mainImage.public_id;
            await cloudinary.uploader.destroy(blogMainImageId);
            const newBlogMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath);
            newBlogData.mainImage = {
                public_id: newBlogMainImage.public_id,
                url: newBlogMainImage.secure_url,
            };
        }

        if (req.files && paraOneImage) {
            if (blog.paraOneImage) {
                const blogparaOneImageId = blog.paraOneImage.public_id;
                await cloudinary.uploader.destroy(blogparaOneImageId);
            }
            const newBlogparaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath);
            newBlogData.paraOneImage = {
                public_id: newBlogparaOneImage.public_id,
                url: newBlogparaOneImage.secure_url,
            };
        }

        if (req.files && paraTwoImage) {
            if (blog.paraTwoImage) {
                const blogparaTwoImageId = blog.paraTwoImage.public_id;
                await cloudinary.uploader.destroy(blogparaTwoImageId);
            }
            const newBlogparaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath);
            newBlogData.paraTwoImage = {
                public_id: newBlogparaTwoImage.public_id,
                url: newBlogparaTwoImage.secure_url,
            };
        }

        if (req.files && paraThreeImage) {
            if (blog.paraThreeImage) {
                const blogparaThreeImageId = blog.paraThreeImage.public_id;
                await cloudinary.uploader.destroy(blogparaThreeImageId);
            }
            const newBlogparaThreeImage = await cloudinary.uploader.upload(paraThreeImage.tempFilePath);
            newBlogData.paraThreeImage = {
                public_id: newBlogparaThreeImage.public_id,
                url: newBlogparaThreeImage.secure_url,
            };
        }
    }

    blog = await Blog.findByIdAndUpdate(id, newBlogData,
        {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
);

    res.status(200).json({
        success: true,
        message: "Blog updated!",
        blog,
    });
});