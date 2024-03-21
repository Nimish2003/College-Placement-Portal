import mongoose from "mongoose";

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, //to make field searchable in optimized manner
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      countryCode: Number,
      number: String,
    },
    address: {
      streetAddress: String,
      apartment: String,
      city: String,
      state: String,
      zip: String,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    profile_pic: {
      type: String, //cloudinary url
      required: true,
    },
    academics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Academics",
    },
    refreshToken: {
      type: String,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
