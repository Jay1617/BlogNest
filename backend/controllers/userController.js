import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/JwtToken.js";
import cloudinary from "cloudinary";


export const register = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar required!", 400));
  }
  const { avatar } = req.files;

  const allowedFormates = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/jpg",
  ];

  if (!allowedFormates.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler(
        `Invalid File type, Please provide your file type in png, jpg or webp only ${avatar.mimetype}`,
        400
      )
    );
  }

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role || !avatar) {
    return next(new ErrorHandler("Please fill all the details"));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exist", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }

  user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  sendToken(user, 200, "User registered successfully", res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill all the details"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not exist", 400));
  }
  const ispasswordMatched = await user.comparePassword(password);
  if (!ispasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided role(${role}) not found`, 400)
    );
  }

  sendToken(user, 200, "User Logged in successfully", res);
});

export const logout = catchAsyncError((req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User loged Out!",
    });
});

export const getMyProfile = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const allAuthors = catchAsyncError(async (req, res, next) => {
  const author = await User.find({ role: "Author" });
  res.status(200).json({
    success: true,
    author,
  });
});
