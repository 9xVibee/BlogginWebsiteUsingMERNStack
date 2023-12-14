import express from "express";
import createBlog from "../controllers/BlogControllers/CreateBlog.js";
import tokenVerify from "../middleware/tokenVerify.js";
import getAllLatestBlog from "../controllers/BlogControllers/getAllLatestBlog.js";
import getAllTrendingBlog from "../controllers/BlogControllers/getAllTrendingBlogs.js";
import searchBlogsTags from "../controllers/BlogControllers/searchBlogsTags.js";
import allLatestBlogCount from "../controllers/BlogControllers/allLatestBlogCount.js";
import searchBlogsCount from "../controllers/BlogControllers/searchBlogsCount.js";

const router = express.Router();

router.post("/create", tokenVerify, createBlog);
router.post("/latest-blogs", getAllLatestBlog);
router.get("/trending-blogs", getAllTrendingBlog);
router.post("/search-blogs", searchBlogsTags);
router.post("/all-latest-blogs-count", allLatestBlogCount);
router.post("/search-blog-count", searchBlogsCount);

export default router;
