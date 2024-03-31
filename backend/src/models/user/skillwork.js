import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectUrl: {
      type: String,
      required: true,
    }, // Project URL
  },
  { timestamps: true }
);

const skillWorkSchema = new mongoose.Schema(
  {
    email:{
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ], // Array of skills
    internships: {
      type: String,
      required: true,
    },
    SEproject: [projectSchema],
    TEproject: [projectSchema],
    certifications: [
      {
        title: String,
        description: String,
      },
    ], // Reference to certificates
    resume: {
      type: String,
      required: true,
    }, // File path or URL to uploaded resume
  },
  { timestamps: true }
);

const Skillwork = mongoose.model("Skillwork", skillWorkSchema);

export default Skillwork;
