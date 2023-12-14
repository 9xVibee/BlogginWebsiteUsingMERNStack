import express from "express";
import signUpUser from "../controllers/UserControllers/signUpUser.js";
import signInUser from "../controllers/UserControllers/signInUser.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export default router;
