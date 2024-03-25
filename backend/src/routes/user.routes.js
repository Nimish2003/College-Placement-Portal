import { Router } from "express";
import {
  //loginUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  verifyOtp,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profile_pic",
      maxCount: 1,
    },
  ]),
  registerUser
);

//router.route("/login").post(loginUser);
router.route("/login").post(login);
// router.route("/academics").get(getUserAcademics);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
//router.route("/academics").post(verifyJWT, createAcademicDetails);
//experimental route
router.route("/verify-otp").post(verifyOtp); //to be used for OTP verification of user's phone 
export default router;
