import mongoose from "mongoose";

const skillWorkSchema = new mongoose.Schema(
  {
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
    previousExperience: {
      type: String,
      required: true,
    },
    partTimeJobs: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: String,
      required: true,
    },
    softSkills: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ], // Reference to projects
    certifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ], // Reference to certificates
    resume: {
      type: String,
      required: true,
    }, // File path or URL to uploaded resume
    areasOfInterest: {
      type: String,
      required: true,
    },
    preferredIndustry: {
      type: String,
      required: true,
    },
    jobRoles: {
      type: String,
      required: true,
    },
    preferredLocations: {
      type: String,
      required: true,
    },
    languagesSpoken: {
      type: String,
      required: true,
    },
    extracurricularActivities: {
      type: String,
      required: true,
    },
    achievementsAwards: {
      type: String,
      required: true,
    },
    professionalProfileLink: {
      type: String,
      required: true,
    },
    references: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Skillwork = mongoose.model("Skillwork", skillWorkSchema);

export default Skillwork;
