import express from "express";
import createBlog from "../controllers/BlogControllers/CreateBlog.js";
import tokenVerify from "../middleware/tokenVerify.js";

const router = express.Router();

router.post("/create", tokenVerify, createBlog);

export default router;
