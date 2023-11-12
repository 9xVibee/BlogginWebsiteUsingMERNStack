import User from "../../Schema/User.js";
import bcrypt from "bcrypt";
import formatUserData from "../../utils/helpers/formatUserData.js";

const signInUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // finding the user in database by email id
    const user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user)
      return res.status(403).json({
        error: "User not found",
      });

    if (user.google_auth)
      return res.status(403).json({
        error:
          "This account was login with google. Please login with the google",
      });

    const isValidPassword = await bcrypt.compare(
      password,
      user.personal_info.password
    );

    if (!isValidPassword)
      return res.status(403).json({
        error: "Wrong password",
      });

    res.status(200).json({
      success: "Succuessfully login",
      user: formatUserData(user),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message + " error in sign",
    });
    console.log(error.message);
  }
};
export default signInUser;
