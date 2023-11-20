import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { LuFileEdit } from "react-icons/lu";
import { BiBell } from "react-icons/bi";

import logo from "../imgs/logo.png";
import { UserContext } from "../App";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const navigate = useNavigate();

  const {
    userAuth,
    userAuth: { access_token, profile_img },
  } = useContext(UserContext);

  const handleUserPanel = () => {
    setShowUserPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowUserPanel(false);
    }, 200);
  };

  // handling search and navigating to search/query
  const handleSearchFunction = (e) => {
    let query = e.target.value;
    console.log(query);
    
    if (e.keyCode === 13 && query.length) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to={"/"} className="flex-none w-10">
          <img src={logo} alt="" className="flex-none w-10" />
        </Link>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[4vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBarVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-md placeholder:text-dark-grey md:pl-14"
            onKeyDown={handleSearchFunction}
          />

          <AiOutlineSearch
            className="absolute right-[10%] 
        md:pointer-events-none top-1/2 -translate-y-3 md:-translate-y-3 md:left-5 text-2xl text-dark-grey"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setSearchBarVisibility((currentVal) => !currentVal)}
          >
            <AiOutlineSearch className="text-xl" />
          </button>

          <Link
            to={"/editor"}
            className="hidden md:flex gap-2 link items-center"
          >
            <LuFileEdit />
            <p>write</p>
          </Link>

          {access_token ? (
            <>
              <Link to={"/dashboard/notification"}>
                <button className="h-12 w-12 rounded-full bg-grey relative hover:bg-black/10">
                  <BiBell className="text-2xl block ml-3 text-dark-grey" />
                </button>
              </Link>
              <div
                className="relative"
                onClick={handleUserPanel}
                onBlur={handleBlur}
              >
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    alt=""
                    className="rounded-full w-full h-full object-cover"
                  />
                </button>
              </div>
              {showUserPanel && <UserNavigationPanel />}
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to={"/signin"}>
                Sign in
              </Link>

              <Link className="hidden md:block btn-light py-2" to={"/signup"}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
