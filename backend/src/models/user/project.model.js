import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologiesUsed: [
      {
        type: String,
        required: true,
      },
    ],
    projectUrl: {
      type: String,
      required: true,
    }, // Project URL
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
