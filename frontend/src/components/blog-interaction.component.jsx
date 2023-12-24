import React, { useContext } from "react";
import { BlogContext } from "../pages/blog.page";
import { GoHeart } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const BlogInteraction = () => {
  let {
    blog: {
      title,
      blog_id,
      activity,
      activity: { total_likes, total_comments },
      author: {
        personal_info: { username: author_username },
      },
    },
    setBlog,
  } = useContext(BlogContext);

  let {
    userAuth: { username },
  } = useContext(UserContext);
  return (
    <>
      <hr className="border-grey my-2 mt-6" />
      <div className="flex gap-6 justify-between">
        <div className="flex gap-6">
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
              <GoHeart />
            </button>
            <p className="text-xl text-dark-grey">{total_likes}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
              <FaRegCommentDots />
            </button>
            <p className="text-xl text-dark-grey">{total_comments}</p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {username == author_username && (
            <Link
              className="underline hover:text-purple"
              to={`/editor/${blog_id}`}
            >
              Edit
            </Link>
          )}
          <Link
            to={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}
            target="_blank"
          >
            <FaXTwitter className="text-xl hover:text-twitter" />
          </Link>
        </div>
      </div>
      <hr className="border-grey my-2" />
    </>
  );
};

export default BlogInteraction;
