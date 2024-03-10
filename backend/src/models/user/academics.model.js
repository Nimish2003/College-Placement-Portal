import mongoose, { Schema } from "mongoose";

const academicsSchema = new Schema(
  {
    college_name: {
      type: String,
      required: true,
    },
    GPA: {
      type: String,
      required: true,
    },
    course_name: {
      type: String,
      enum: ["CS", "IT", "Mechanical", "EXTC", "AIDS"],
      required: true,
    },
    achievements: [
      {
        title: {
          type: [String || ""],
        },
        description: {
          type: [String || ""],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Academics = mongoose.model("Academics", academicsSchema);
