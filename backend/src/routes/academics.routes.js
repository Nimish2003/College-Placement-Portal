import express from "express";
import {Router} from "express";
import {academics} from "../controllers/academic.controller.js"
const router = Router();
router.route("/academics").post(academics);

export default  router;


