import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseCreatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    courseCode: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseDesc: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    courseFee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Course = mongoose.model("Course", courseSchema);
