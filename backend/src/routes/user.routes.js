import { Router } from "express";
import { getcurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { userRegistrationValidator } from "../validatiors/auth.validators.js";
import { validator } from "../middlewares/validetor.middlewares.js";

const userRouter = Router();

userRouter.route("/register").post(userRegistrationValidator(), validator, registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").get(logoutUser)
userRouter.route("/me").get(getcurrentUser)

export default userRouter