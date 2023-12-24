import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";

export const blogStructure = {
  title: "",
  activity: {},
  des: "",
  content: "",
  banner: "",
  tags: [],
  author: { personal_info: {} },
  publishedAt: "",
};

export const BlogContext = createContext({});

const BlogPage = () => {
  const [blog, setBlog] = useState(blogStructure);
  const [loading, setLoading] = useState(false);

  // accessing blog id from url
  let { blog_id } = useParams();

  // destructuring the blog
  let {
    title,
    activity,
    content,
    banner,
    des,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
    },
    publishedAt,
  } = blog;

  // function to fetch the blog details
  const fetchBlogDetails = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/get-blog", {
        blog_id,
      })
      .then(({ data }) => {
        setBlog(data.blog);
        console.log(data.blog);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider
          value={{
            blog,
            setBlog,
          }}
        >
          <div className="max-w-[900px] center py-12 max-lg:px-[5vw]">
            <img src={banner} className="aspect-video" />

            <div className="mt-12">
              <h2>{title}</h2>
              <div className="flex max-sm:flex-col justify-between my-3">
                <div className="flex gap-5 items-start">
                  <img
                    src={profile_img}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="capitalize">
                    {fullname} <br />@
                    <Link to={`/user/${author_username}`} className="underline">
                      {author_username}
                    </Link>
                  </p>
                </div>
                <p className="text-dark-grey opacity-75 max-sm:mt-2 max-sm:ml-12 max-sm:pl-5">
                  Published on : {getDay(publishedAt)}
                </p>
              </div>
            </div>

            <BlogInteraction />
            {/* Blog Content */}
            <BlogInteraction />
            
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
