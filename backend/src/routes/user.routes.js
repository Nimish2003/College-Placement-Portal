import { Router } from "express";
import {
  //loginUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  editProfile,
  verifyOtp,
  updateAcademicDetails,
  editProfessionalDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

//router.route("/login").post(loginUser);
router.route("/login").post(login);
// router.route("/academics").get(getUserAcademics);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

//Profile creation routes
router.route("/profile").patch(editProfile);
router.route("/academic").patch(updateAcademicDetails);
router.route("/professional").patch(editProfessionalDetails);
//experimental route
router.route("/verify-otp").post(verifyOtp); //to be used for OTP verification of user's phone
export default router;
