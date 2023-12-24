import express from "express";
import signUpUser from "../controllers/UserControllers/signUpUser.js";
import signInUser from "../controllers/UserControllers/signInUser.js";
import searchUsers from "../controllers/UserControllers/searchusers.js";
import getUserProfile from "../controllers/UserControllers/getUserProfile.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/searchuser", searchUsers);
router.post("/getprofile", getUserProfile);

export default router;
