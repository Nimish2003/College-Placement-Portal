import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userType: {
        
    }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
