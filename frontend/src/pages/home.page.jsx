import React, { useEffect, useState } from "react";
import InPageNavigation from "../components/inpage-navigation.component";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogCard from "../components/BlogCard";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { defaultTabLine } from "../components/inpage-navigation.component";

import { FaArrowTrendUp } from "react-icons/fa6";
import NoDataComponent from "../components/nodata.component";
import { filterPaginationData } from "../common/filterPaginationData";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setrendingBlogs] = useState([]);
  const [pageState, setPageState] = useState("home");
  const [loader, setLoader] = useState(false);

  let categories = [
    "programming",
    "gaming",
    "movie",
    "social media",
    "finances",
  ];

  // fetching latest blogs
  const fetchLatestBlogs = async ({ page = 1 }) => {
    setLoader(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/latest-blogs", {
        page,
      })
      .then(async (res) => {
        let formateData = await filterPaginationData({
          prevState: blogs,
          data: res.data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });

        console.log(formateData);
        setBlogs(formateData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  // fetching trending blogs
  const fetchTrendingBlogs = () => {
    setLoader(true);
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/blog/trending-blogs")
      .then((res) => {
        setrendingBlogs(res.data.blogs);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  // fetching blogs by tags
  const fetchBlogsByTags = ({ page = 1 }) => {
    setLoader(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async (res) => {
        let formateData = await filterPaginationData({
          prevState: blogs,
          data: res.data.blogs,
          page,
          countRoute: "/search-blog-count",
          data_to_send: { tag: pageState },
        });

        console.log(formateData);
        setBlogs(formateData);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (pageState === "home") fetchLatestBlogs({ page: 1 });
    else fetchBlogsByTags({ page: 1 });

    if (trendingBlogs.length === 0) fetchTrendingBlogs();

    defaultTabLine.current.click();
  }, [pageState]);

  // handling category click filter!
  const loadBlogByCategory = (e) => {
    let category = e.target.innerText.toLowerCase();

    setBlogs([]);
    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  return (
    <AnimationWrapper>
      {/* section will contain two parts one home and another is trending right sidebar */}
      <section className="h-cover flex justify-center gap-10 ">
        {/* latest blogs */}
        <div className="w-full ">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            {
              <>
                {loader ? (
                  <Loader />
                ) : blogs.results?.length ? (
                  blogs.results.map((blog, i) => {
                    return (
                      <AnimationWrapper
                        transition={{
                          duration: 1,
                          delay: i * 0.2,
                        }}
                        key={i}
                      >
                        <BlogCard
                          content={blog}
                          author={blog.author.personal_info}
                        />
                      </AnimationWrapper>
                    );
                  })
                ) : (
                  <NoDataComponent message={"No Blogs Published"} />
                )}
                <LoadMoreDataBtn
                  state={blogs}
                  fetchDataFun={
                    pageState === "home" ? fetchLatestBlogs : fetchBlogsByTags
                  }
                />
              </>
            }
            {loader ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{
                      duration: 1,
                      delay: i * 0.2,
                    }}
                    key={i}
                  >
                    <MinimalBlogPost blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataComponent message={"No Trendning Blogs"} />
            )}
          </InPageNavigation>
        </div>

        {/* filters and trending blogs */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="font-medium text-xl mb-4">
              Stories from all interests
            </h1>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category, idx) => {
                return (
                  <button
                    onClick={loadBlogByCategory}
                    key={idx}
                    className={
                      "tag " +
                      (pageState === category ? "bg-black text-white" : " ")
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl mb-8 flex items-center gap-2">
              Trending <FaArrowTrendUp size={"18"} />
            </h1>
            {trendingBlogs.map((blog, i) => {
              return (
                <AnimationWrapper
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                  }}
                  key={i}
                >
                  <MinimalBlogPost blog={blog} index={i} />
                </AnimationWrapper>
              );
            })}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
