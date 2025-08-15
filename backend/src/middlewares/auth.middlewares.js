import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { environment } from "../utils/constenst.js";
import { User } from "../models/user.models.js";

const verifyJWT = asyncHandler((req, _ , next) => {
  const accessToken =
    req.cookies?.accessToke ||
    req.header("Authentication").replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(401, "User not loggedin");
  }

  const decodedToken = jwt.verify(accessToken, environment.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(401, "Token is invalid");
  }

  req.user = decodedToken._id;
  next();
});

const checkPermission = (roles = []) =>
  asyncHandler(async (req, _ , next) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ApiError(401, "User does not exist");
    }

    const role = user.role;

    if (!roles.includes(role)) {
      throw new ApiError(401, "You are not authorized");
    }
    next();
  });

export { verifyJWT, checkPermission };
