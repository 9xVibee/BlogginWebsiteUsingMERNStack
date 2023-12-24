import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import AnimationWrapper from "./../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/AboutUser";
import { filterPaginationData } from "../common/filterPaginationData";
import InPageNavigation from "../components/inpage-navigation.component";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import NoDataComponent from "../components/nodata.component";
import BlogCard from "../components/BlogCard";
import NotFoundPage from "./PageNotFound";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_reads: 0,
    total_posts: 0,
  },
  social_links: {},
  joinedAt: "",
};

const ProfilePage = () => {
  // getting username from url
  let { id: userId } = useParams();
  const [noOfBlogs, setNoOfBlogs] = useState(0);
  const [profile, setProfile] = useState(profileDataStructure);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  // Destructuring data
  let {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  // Fetching user profile
  const fetchUserProfile = () => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/users/getprofile", {
        userId,
      })
      .then(({ data }) => {
        setProfileLoaded(userId);
        if (data !== null) setProfile(data);
        getBlogs({ user_id: data._id });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // Getting users Blogs
  const getBlogs = ({ page = 1, user_id }) => {
    user_id = user_id === undefined ? blogs.user_id : user_id;
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/search-blogs", {
        author: user_id,
        page,
      })
      .then(async ({ data }) => {
        setNoOfBlogs(data.blogs.length);
        let formatData = await filterPaginationData({
          prevState: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blog-count",
          data_to_send: { author: user_id },
        });
        formatData.user_id = user_id;
        setBlogs(formatData);
      })
      .catch((err) => console.log(err.message));
  };

  // Destructuring login user
  const {
    userAuth: { username },
  } = useContext(UserContext);

  useEffect(() => {
    resetStates();
    fetchUserProfile();
  }, [userId]);

  // Resseting the states
  const resetStates = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setBlogs([]);
    window;
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : profile_username.length ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-8 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center min-w-[250px] md:w-[50%] md:pl-8 md:border-l border-grey md:sticky md:top-[-100px] md:py-10">
            <img
              src={profile_img}
              alt=""
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
            />
            <h1 className="text-xl font-medium mt-1">@{profile_username}</h1>
            <p className="text-xl capitalize h-10 mt-[1rem]">{fullname}</p>
            <p>
              {noOfBlogs.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} Reads
            </p>

            {/* Edit Profile */}
            <div className="flex gap-4 mt-2">
              {username === profile_username ? (
                <Link
                  to={"/settings/edit-profile"}
                  className="btn-light rounded-md"
                >
                  Edit Profile
                </Link>
              ) : (
                " "
              )}
            </div>

            <AboutUser
              className="max-md:hidden"
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
            />
          </div>

          {/* Displaying blogs! */}
          <div className="max-md:mt-12 w-full">
            <InPageNavigation
              routes={["Blogs Published", "About"]}
              defaultHidden={["About"]}
            >
              {
                <>
                  {loading ? (
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
                  <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs} />
                </>
              }
              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </InPageNavigation>
          </div>
        </section>
      ) : (
        <NotFoundPage />
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
