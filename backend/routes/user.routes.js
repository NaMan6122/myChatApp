import { Router } from "express";
import { getCurrentUserInfo, onLogin, onSignup } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"



const router = Router();

router.route("/signup").post(onSignup);
router.route("/login").post(onLogin);

//secure routes
router.route("/logout").post(verifyJWT);
router.route("/profile").get(verifyJWT);
router.route("/reset-password").patch(verifyJWT);
router.route("/get-user-info").get(verifyJWT, getCurrentUserInfo);

export default router