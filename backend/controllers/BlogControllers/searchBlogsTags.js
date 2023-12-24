import Blog from "../../Schema/Blog.js";

const searchBlogsTags = (req, res) => {
  let { tag, page, query, author } = req.body;
  let findQuery;

  if (tag) findQuery = { tags: tag, draft: false };
  else if (query)
    findQuery = {
      draft: false,
      title: new RegExp(query, "i"),
    };
  else if (author) {
    findQuery = {
      author,
      draft: false,
    };
  }
  try {
    let maxLimit = 5;

    Blog.find(findQuery)
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
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};
export default searchBlogsTags;
