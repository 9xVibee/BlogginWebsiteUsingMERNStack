import { nanoid } from "nanoid";
import Blog from "../../Schema/Blog.js";
import User from "../../Schema/User.js";
import cloudinary from "cloudinary";

const createBlog = async (req, res) => {
  try {
    let authorId = req.user;
    let { title, des, banner, tags, content, draft } = req.body;

    if (!title.length)
      return res.status(403).json({
        error: "You must provide a title to publish the blog",
      });

    if (!draft) {
      if (!banner.length)
        return res.status(403).json({
          error: "You must provide the blog banner!",
        });

      if (!content.blocks.length)
        return res.status(403).json({
          error: "There must be some blog content to publish it!",
        });

      if (!tags.length || tags.length > 10) {
        return res.status(403).json({
          error:
            "You must provide in order to publish, Maximum there can be only 10 tags",
        });
      }
    }

    if (banner) {
      const uploadedResponse = await cloudinary.uploader.upload(banner);
      banner = uploadedResponse.secure_url;
      console.log(banner);
    }

    // lower casing them to make them as one tag category else front example will consider as diff tags! -> tech, Tech, TECH
    tags = tags.map((tag) => tag.toLowerCase());

    let blog_id =
      title
        .replace(/[^a-zA-Z0-9]/g, " ")
        .replace(/\s+/g, "-")
        .trim() + nanoid();

    const blog = new Blog({
      title,
      des,
      banner,
      content,
      tags,
      author: authorId,
      blog_id,
      draft: Boolean(draft),
    });
    await blog.save();

    console.log("point 2");
    // updaating user info also
    let incrementVal = draft ? 0 : 1;
    User.findOneAndUpdate(
      { _id: authorId },
      {
        $inc: { "account_info.total_posts": incrementVal },
        $push: {
          blogs: blog._id,
        },
      }
    );

    console.log("point 3");
    res.status(200).json({
      id: blog.blog_id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log("error in create blog " + err);
  }
};
export default createBlog;
