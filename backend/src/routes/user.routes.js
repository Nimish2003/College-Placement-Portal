import { Router } from "express";
import {
  download,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getUserAcademics
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

router.route("/login").post(loginUser);
router.route("/academics").get(getUserAcademics);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/profile").post(verifyJWT, )
//experimental route
router.route("/download").get(download);

export default router;
