import mongoose, { Schema } from "mongoose";

const backlogSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
});

const academicsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true,
    },
    sscMarks: {
      type: Number,
      required: true,
    },
    educationType: {
      type: String,
      required: true,
    },
    board12thMarks: {
      type: Number,
    },
    diplomaMarks: {
      type: Number,
    },
    branch: {
      type: String,
      required: true,
    },
    yearOfStudy: {
      type: String,
      required: true,
    },
    semesters: [
      {
        semester: {
          type: Number,
          required: true,
        },
        gpa: {
          type: Number,
          required: true,
        },
      },
    ],
    backlogs: [backlogSchema],
  },
  { timestamps: true }
);

// Function to compute overall GPA based on semester-wise GPA
academicsSchema.methods.computeOverallGPA = function () {
  const { semester_gpas } = this.degree;
  const totalCredits = semester_gpas.length;
  let totalGPA = 0;
  for (const sem of semester_gpas) {
    totalGPA += sem.gpa;
  }
  return totalGPA / totalCredits;
};

// Function to compute percentage based on overall GPA
academicsSchema.methods.computePercentage = function () {
  const overallGPA = this.computeOverallGPA();
  // You can define a formula to convert GPA to percentage
  // For example, you can use a simple linear conversion
  // Note: This formula may vary based on the grading system
  return overallGPA * 10;
};

export const Academics = mongoose.model("Academics", academicsSchema);
