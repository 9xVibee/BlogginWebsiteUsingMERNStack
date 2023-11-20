import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import InPageNavigation from "../components/inpage-navigation.component";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import NoDataComponent from "../components/nodata.component";
import Loader from "../components/loader.component";
import BlogCard from "../components/BlogCard";

import AnimationWrapper from "../common/page-animation";

import { filterPaginationData } from "../common/filterPaginationData";
import axios from "axios";

const SearchPage = () => {
  let { query } = useParams();
  let [blogs, setBlogs] = useState([]);
  let [loader, setLoader] = useState(false);

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    setLoader(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/search-blogs", {
        query,
        page,
      })
      .then(async (res) => {
        console.log(res);
        let formateData = await filterPaginationData({
          prevState: blogs,
          data: res.data.blogs,
          page,
          countRoute: "/search-blog-count",
          data_to_send: { query },
          create_new_arr,
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

  //   create_new_arr will basically remove previous data and get new result
  //   if we put it as false it will add the new search data in the previous data
  //   basically duplicate data will be showned to the client side!
  useEffect(() => {
    resetBlogs();
    searchBlogs({ page: 1, create_new_arr: true });
  }, [query]);

  const resetBlogs = () => {
    setBlogs([]);
  };

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search Results from "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
        >
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
            <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs} />
          </>
        </InPageNavigation>
      </div>
    </section>
  );
};

export default SearchPage;
