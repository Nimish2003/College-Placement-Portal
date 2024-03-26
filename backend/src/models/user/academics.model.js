// MongoDB model
import mongoose, { Schema } from "mongoose";

const backlogSchema = new Schema({
  subject: {
    type: String,
    required: false,
  },
  semester: {
    type: String,
    required: false,
  },
});

const academicsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    sscMarks: {
      type: String,
      required: true,
    },
    educationType: {
      type: String,
      required: true,
    },
    board12thMarks: {
      type: String,
    },
    diplomaMarks: {
      type: String,
    },
    branch: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: String,
      required: true,
    },
    semesters: {
      BE: {
        type: {
          seventhSemGPA: {
            type: String,
            required: false,
          },
        },
        required: false,
      },
      "TE passed": {
        type: {
          firstSemGPA: {
            type: String,
            required: false,
          },
          secondSemGPA: {
            type: String,
            required: false,
          },
          thirdSemGPA: {
            type: String,
            required: false,
          },
          fourthSemGPA: {
            type: String,
            required: false,
          },
          fifthSemGPA: {
            type: String,
            required: false,
          },
          sixthSemGPA: {
            type: String,
            required: false,
          },
        },
        required: false,
      },
    },
    backlogs: [backlogSchema],
  },
  { timestamps: true }
);

// Function to compute overall GPA based on semester-wise GPA
academicsSchema.methods.computeOverallGPA = function () {
  const semesterGPAs = this.semesters[this.yearOfStudy];
  const totalSemesters = Object.keys(semesterGPAs).length;
  let totalGPA = 0;
  for (const sem in semesterGPAs) {
    totalGPA += parseFloat(semesterGPAs[sem]);
  }
  return totalGPA / totalSemesters;
};

// Function to compute percentage based on overall GPA
academicsSchema.methods.computePercentage = function () {
  const overallGPA = this.computeOverallGPA();
  return overallGPA * 10; // Assuming GPA is out of 10
};

export const Academics = mongoose.model("Academics", academicsSchema);
