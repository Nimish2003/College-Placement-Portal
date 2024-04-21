import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
      index: true, //to make field searchable in optimized manner
    },
    lastName: {
      type: String,
      // required: true,
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
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit number!`,
      },
    },
    dob:{
      type:  Date,
    } ,
    address: {
      type:String,
    },
    // gender: {
    //   type: String,
    //   //enum: ["Male", "Female", "Other"],
    // },
    profile_pic: {
      type: String, //cloudinary url
    },
    academics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Academics",
    },
    skills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skillwork",
    },
    refreshToken: {
      type: String,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

//mongoose hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//jwt.sign(payload, jwt_secret, secret_expiry)
userSchema.methods.generateAccessToken = async function () {
  try {
    return await jwt.sign(
      {
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

userSchema.methods.generateRefreshToken = async function () {
  try {
    return await jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};

export const User = mongoose.model("User", userSchema);
