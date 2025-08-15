import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { environment } from "../utils/constenst";

const verifyJWT = asyncHandler((req, res, next) => {
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

export { verifyJWT };
