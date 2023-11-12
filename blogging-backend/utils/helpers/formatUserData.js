import Jwt from "jsonwebtoken";

const formatUserData = (newUser) => {
  const access_token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  return {
    access_token,
    profile_img: newUser.personal_info.profile_img,
    username: newUser.personal_info.username,
    fullname: newUser.personal_info.fullname,
  };
};

export default formatUserData;
