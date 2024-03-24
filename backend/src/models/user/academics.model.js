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
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    ssc: {
      marks: {
        type: Number,
        required: true,
      },
      school_name: {
        type: String,
        required: true,
      },
      year_of_passing: {
        type: Number,
        required: true,
      },
    },
    hsc: {
      marks: {
        type: Number,
        required: true,
      },
      college_name: {
        type: String,
        required: true,
      },
      year_of_passing: {
        type: Number,
        required: true,
      },
    },
    diploma: {
      marks: {
        type: Number,
      },
      college_name: {
        type: String,
      },
      year_of_passing: {
        type: Number,
      },
    },
    degree: {
      college_name: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        enum: ["CS", "IT", "AIDS", "MECH", "EXTC"],
        required: true,
      },
      year_of_study: {
        type: String,
        enum: ["FE", "SE", "TE", "BE"],
        required: true,
      },
      semester_gpas: [
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
      backlog: [backlogSchema],
    },
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
