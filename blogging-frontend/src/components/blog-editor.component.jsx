import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../imgs/logo.png";
import defaultBanner from "../imgs/blog banner.png";

import AnimationWrapper from "../common/page-animation";
import usePreviewingImg from "../hooks/imagePreviewUrl";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";

import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { UserContext } from "../App";

const BlogEditor = () => {
  const navigate = useNavigate();

  // creating the editorJs
  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJs({
          holderId: "textEditor",
          data: content,
          tools: tools,
          placeholder: "Let's write an awesome story",
        })
      );
    }
  }, []);

  // using Editor Context
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  // using userContext
  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const { handleImageChange, imgUrl } = usePreviewingImg();
  const fileRef = useRef(null);

  // handeling keyDown/ Enter
  const handleTitleKeyDown = (e) => {
    // to prevent enter we will use  preventDefault on Enter
    if (e.keyCode == 13) {
      // 13 is code of Enter
      e.preventDefault();
    }
  };

  //handeling title change
  const handleTitleChange = (e) => {
    let input = e.target;

    // setting the textarea height to the scroll height which means we will not see the scrollbar!
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  //updating banner img whenever the image gets update
  useEffect(() => {
    if (imgUrl) setBlog({ ...blog, banner: imgUrl });
  }, [imgUrl]);

  // handling publish button
  const handlePublish = () => {
    if (!banner.length) return toast.error("Upload a blog banner!");

    if (!title.length) return toast.error("Write blog title to publish!");

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error("write something in your blog to publish it!");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) return;

    if (!title.length) {
      return toast.error("Write Blog Title before saving it as draft!");
    }

    let loading = toast.loading("Savingg...");
    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          des,
          content,
          tags,
          draft: true,
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
            toast.success("Saved!");

            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loading);
            return toast.error(response.data.error);
          });
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "new blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            publish
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto mx-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={banner || defaultBanner}
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
            <textarea
              value={title}
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
