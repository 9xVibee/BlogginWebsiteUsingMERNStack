import React, { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../imgs/logo.png";
import defaultBanner from "../imgs/blog banner.png";

import AnimationWrapper from "../common/page-animation";
import usePreviewingImg from "../hooks/imagePreviewUrl";
import { Toaster } from "react-hot-toast";

const BlogEditor = () => {
  const { handleImageChange, imgUrl } = usePreviewingImg();
  const fileRef = useRef(null);

  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">new blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto mx-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={imgUrl || defaultBanner}
                  onClick={() => fileRef.current.click()}
                  className="z-20 object-cover"
                />
                <input
                  ref={fileRef}
                  type="file"
                  id="uploadBanner"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
