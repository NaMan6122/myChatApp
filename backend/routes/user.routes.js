import { Router } from "express";
import { onSignup } from "../controllers/user.controllers.js"



const router = Router();

router.route("/signup").post(onSignup);
router.route("/login").post();
router.route("/logout").post();
router.route(".profile").get();
router.route("/reset-password").patch();

export default router