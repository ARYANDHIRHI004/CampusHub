import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { environment } from "./utils/constenst.js";

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

//Routes Imports
// app.use("/user")

export default app;
