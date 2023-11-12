import express from "express";
import signUpUser from "../controllers/UserRoutes/signUpUser.js";
import signInUser from "../controllers/UserRoutes/signInUser.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export default router;
