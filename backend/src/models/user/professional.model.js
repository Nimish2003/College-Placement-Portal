import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
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
  }
});

const professionalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  internship:{
    type: String,
  },
  projects: [projectSchema],
  course: {
    type: String,
  },
}, { timestamps: true });

export const Professional = mongoose.model("Professional", professionalSchema);
