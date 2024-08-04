import { Router } from "express";

const router = Router();

router.route("/register").post();
router.route("/login").post();
router.route("/logout").post();
router.route(".profile").get();
router.route("/reset-password").patch();

export default router