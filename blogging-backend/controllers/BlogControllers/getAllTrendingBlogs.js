import Blog from "../../Schema/Blog.js";

const getAllTrendingBlog = (req, res) => {
  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullname -_id"
    )
    .sort({
      "activity.total_reads": -1,
      "activity.total_likes": -1,
      publishedAt: -1,
    })
    .select("blog_id title publishedAt -_id")
    .limit(5)
    .then((blogs) => {
      console.log(blogs);
      return res.status(200).json({ blogs });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
};
export default getAllTrendingBlog;
