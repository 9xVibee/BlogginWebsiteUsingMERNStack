import React, { useContext } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { EditorContext } from "../pages/editor.pages";

const Tag = ({ tag, tagIndex }) => {
  const {
    setBlog,
    blog,
    blog: { tags },
  } = useContext(EditorContext);

  //   adding the contentEditable
  const AddAttribute = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  //   handling the tag delete!
  const handleDeleteTag = () => {
    let newTags = tags.filter((item) => item !== tag);
    console.log(newTags);
    setBlog({ ...blog, tags: newTags });
    e.target.setAttribute("contentEditable", false);
  };

  //   handling the contentEditable
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });
      e.target.setAttribute("contentEditable", false);
    }
  };
  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:opacity-50 pr-10">
      <p
        className="outline-none"
        onKeyDown={handleKeyDown}
        onClick={AddAttribute}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-2 top-[16px] -translate-y-1/2"
        onClick={handleDeleteTag}
      >
        <RxCrossCircled className="text-2xl pointer-events-none" />
      </button>
    </div>
  );
};

export default Tag;
