import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { LuFileEdit } from "react-icons/lu";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const handleSignOut = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      classname={"absolute right-0 z-50 top-20"}
    >
      <div
        className="bg-white
       absolute right-6 border border-grey w-60 duration-200"
      >
        <Link to={"/editor"} className=" flex gap-2 link md:hidden pl-8 py-4">
          <LuFileEdit />
          <p>write</p>
        </Link>
        <Link to={`/user/${username}`} className="pl-8 py-4 link">
          profile
        </Link>
        <Link to="/dashboard/blogs" className="pl-8 py-4 link">
          Dashboard
        </Link>
        <Link to="/dashboard/edit-profile" className="pl-8 py-4 link">
          Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={handleSignOut}
        >
          <h1 className="font-bold text-xl mb-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
