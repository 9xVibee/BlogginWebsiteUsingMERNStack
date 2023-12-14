import express from "express";
import googleCheckToken from "../controllers/googleCheckToken.js";

const router = express.Router();

router.post("/", googleCheckToken);

export default router;
