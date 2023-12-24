import Blog from "../../Schema/Blog.js";
import User from "../../Schema/User.js";

const getBlog = (req, res) => {
  let { blog_id } = req.body;
  let incrementalVal = 1;

  Blog.findOneAndUpdate(
    { blog_id: blog_id },
    {
      $inc: { "activity.total_reads": incrementalVal },
    }
  )
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .select("title des content banner activity publishedAt blog_id tags")
    .then((blog) => {
      // updating Author reads also in there account
      User.findOneAndUpdate(
        {
          "personal_info.username": blog.author.personal_info.username,
        },
        {
          $inc: { "account_info.total_reads": incrementalVal },
        }
      ).catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
      return res.status(200).json({
        blog,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message,
      });
    });
};
export default getBlog;
