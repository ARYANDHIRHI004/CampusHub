import mongoose from "mongoose";
import {
  AvailableUserRoles,
  environment,
  UserRolesEnum,
} from "../utils/constenst";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userScheme = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.STUDENT,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: String,
    },
    refreshToken: {
      type: Date,
    },
    refreshTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userScheme.methods.comparePassword = async function (password) {
  return await bcrypt.compare(this.password, password);
};

userScheme.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullname: this.fullname,
      email: this.email,
    },
    environment.ACCESS_TOKEN_SECRET,
    {
      expiresIn: environment.ACCESS_TOKEN_EXPIRY,
    },
  );
};

userScheme.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    environment.REFRESH_TOKEN_SECRET,
    {
      expiresIn: environment.REFRESH_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userScheme);
