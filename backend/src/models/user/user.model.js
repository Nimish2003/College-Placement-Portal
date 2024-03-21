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
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


export const User = mongoose.model("User", UserSchema);
