import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { getFullDay } from "../common/date";
import { useEffect, useState } from "react";

const AboutUser = ({ className, bio, social_links, joinedAt }) => {
  const className1 = "text-3xl hover:text-black";

  const iconObj = {
    youtube: <FaYoutube className={className1} />,
    github: <FaGithub className={className1} />,
    instagram: <FaInstagram className={className1} />,
    facebook: <FaFacebook className={className1} />,
    twitter: <FaXTwitter className={className1} />,
    website: <AiOutlineGlobal className={className1} />,
  };

  return (
    <div className={"w-[100%] md:mt-7 " + className}>
      <p className="text-xl leading-7">
        {bio.length ? bio : "Nothing to read here"}
      </p>

      {/* Icons */}
      <div className="flex gap-x-4 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
        {Object.keys(social_links).map((key) => {
          let link = social_links[key];
          return link ? (
            <Link to={link} key={key} className="flex items-center gap-2">
              {iconObj[key]}
            </Link>
          ) : (
            ""
          );
        })}
      </div>

      <p className="text-xl leading-7 text-dark-grey">
        Joined on {getFullDay(joinedAt)}
      </p>
    </div>
  );
};

export default AboutUser;
