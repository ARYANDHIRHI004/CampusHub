import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { environment } from "./utils/constenst.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: environment.ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Routes Imports

app.use("api/v1/auth", userRouter)

export default app;
