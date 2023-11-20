import Blog from "../../Schema/Blog.js";

const searchBlogsCount = (req, res) => {
  let { data_to_send } = req.body;
  let { tag, query } = data_to_send;
  let findQuery;

  if (tag) findQuery = { tags: tag, draft: false };
  else if (query)
    findQuery = {
      title: new RegExp(query, "i"),
      draft: false,
    };

  Blog.countDocuments(findQuery)
    .then((count) => {
      console.log(count);
      return res.status(200).json({
        totalDocs: count,
      });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    });
};
export default searchBlogsCount;
