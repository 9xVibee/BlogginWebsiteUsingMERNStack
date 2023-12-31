import React from "react";
import { getDay } from "../common/date";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ content, author }) => {
  let {
    publishedAt,
    tags,
    banner,
    des,
    title,
    activity: { total_likes },
    blog_id: id,
  } = content;
  let { fullname, username, profile_img } = author;
  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-8 items-center border-b border-grey pb-5 mb-7"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt) + " publishedAt"}</p>
        </div>

        <h1 className="blog-title max-sm:text-xl md:max-[1100px]:mb-1">
          {title}
        </h1>
        <p className="my-3 font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {des}
        </p>
        <div className="flex gap-4 mr-4">
          <span className="btn-light py-1 px-4">{tags[0]}</span>
          <span className="flex ml-3 items-center gap-2 text-dark-grey">
            <FaRegHeart className="text-xl" /> {total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey">
        <img
          src={banner}
          alt=""
          className="w-full h-full aspect-square object-cover"
        />
      </div>
    </Link>
  );
};

export default BlogCard;
