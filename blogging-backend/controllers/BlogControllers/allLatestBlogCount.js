import Blog from "../../Schema/Blog.js";

const allLatestBlogCount = (req, res) => {
  Blog.countDocuments({ draft: false })
    .then((count) => {
      return res.status(200).json({
        totalDocs: count,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
};
export default allLatestBlogCount;
