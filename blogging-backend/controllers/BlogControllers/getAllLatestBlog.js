import Blog from "../../Schema/Blog.js";

const getAllLatestBlog = (req, res) => {
  let { page } = req.body;
  let maxLimit = 5;
  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullname -_id"
    )
    .sort({
      publishedAt: -1,
    })
    .select("blog_id title des banner tags activity publishedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
};

export default getAllLatestBlog;
