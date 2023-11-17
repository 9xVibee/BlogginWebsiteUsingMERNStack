import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";
import axios from "axios";
import { UserContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";

const PublishForm = () => {
  const navigate = useNavigate();
  let characterLimit = 200;
  let tagLimit = 10;

  // user context
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  // blog context
  const {
    blog,
    setBlog,
    blog: { banner, title, tags, des, content },
    setEditorState,
  } = useContext(EditorContext);

  // handling close btn which goes back to editor page
  const handleCloseBtn = () => {
    setEditorState("editor");
  };

  // handling des change
  const handleDescChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  // handling title change
  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  // handeling keyDown/ Enter
  const handleTitleKeyDown = (e) => {
    // to prevent enter we will use  preventDefault on Enter
    if (e.keyCode == 13) {
      // 13 is code of Enter
      e.preventDefault();
    }
  };

  // handling tags
  const handleKeyDownTag = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();

      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        } else if (tags.includes(tag)) {
          toast.error(`${tag} tag is already added!`);
        }
      } else {
        toast.error(`You can't add more than ${tagLimit} tags!`);
      }
      e.target.value = "";
    }
  };

  // handling the blog publishing
  const handlePublishBlog = (e) => {
    if (e.target.className.includes("disable")) return;

    if (!title.length) {
      return toast.error("Write Blog Title before publishing!");
    }

    if (!des.length || des.length > characterLimit) {
      return toast.error("Provide description within 200 characters!");
    }

    if (!tags.length) {
      return toast.error("Enter atleast 1 tag to rank your blog!");
    }

    let loading = toast.loading("Publishing...");
    e.target.classList.add("disable");

    let blogObj = {
      title,
      banner,
      des,
      content,
      tags,
      draft: false,
    };
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/blog/create", blogObj, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loading);
        toast.success("The blog is published!");

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch(({ res }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loading);
        console.log(res);
        return toast.error(res);
      });
  };
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
        <Toaster />
        {/* cross button */}
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseBtn}
        >
          <RxCrossCircled size="22" />
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt4">
            <img src={banner} alt="" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 my-4">
            {des}
          </p>
        </div>

        <div className="border-grey">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Short Description about your blog 😀
          </p>
          <textarea
            maxLength={characterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleDescChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>
          <p>Topics - (Helps is searching and ranking your blog) </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3
            focus:bg-white
            "
              onKeyDown={handleKeyDownTag}
            />
            {tags.map((tag, idx) => (
              <Tag tag={tag} key={idx} tagIndex={idx} />
            ))}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">
            {tagLimit - tags.length} Tags Remain!
          </p>
          <button className="btn-dark px-8 py-3" onClick={handlePublishBlog}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
