import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";

const generateAccessAndRefreshToken = asyncHandler(async (user) => {
  const accessTokne = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { accessTokne, refreshToken };
});

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  const existedUser = await User.find({
    $or: [{ fullname }, { email }],
  });

  if (existedUser) {
    throw new ApiError(401, "User already exist");
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const mailOption = {
    email: user.email,
    subject: "Email verification",
    mailGenContent: emailVerificationMailGenContent(
      username,
      `http://localhost:8000/api/v1/user/verifyEmail/${verificationToken}`,
    ),
  };

  const isMailed = sendMail(mailOption);

  const user = await User.create({
    fullname,
    email,
    password,
    username,
    emailVerificationToken: verificationToken,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, "User registered successfully", {}));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  }).select("-password -resfreshToken -emailVerificationToken");

  if (!user) {
    throw new ApiError(401, "User does not exist.");
  }

  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user,
  );

  const options = {
    httpOnly: true,
  };

  return req
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, "User logged In", user));
});

export const logoutUser = asyncHandler(async (req, res) => {});
export const getcurrentUser = asyncHandler(async (req, res) => {});
