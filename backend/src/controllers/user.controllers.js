import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import { emailVerificationMailGenContent, sendMail } from "../utils/mail.js";

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

export const loginUser = asyncHandler(async (req, res) => {});

export const logoutUser = asyncHandler(async (req, res) => {});
export const getcurrentUser = asyncHandler(async (req, res) => {});
