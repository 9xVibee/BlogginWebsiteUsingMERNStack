import bcrypt from "bcrypt";
import User from "../../Schema/User.js";
import formatUserData from "../../utils/helpers/formatUserData.js";

const signUpUser = async (req, res) => {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  try {
    let { fullname, email, password } = req.body;
    let username = email.split("@")[0];

    // if the fullname is length is less than 3 then return!
    if (fullname.length < 3)
      return res.status(403).json({
        error: "Full name must be at least 3 letters long",
      });

    // if email length === 0 return
    if (!email.length) {
      return res.status(403).json({
        error: "Enter email!",
      });
    }

    // checking if valid email or not with regex
    if (!emailRegex.test(email)) {
      return res.status(403).json({
        error: "Enter the valid email address!",
      });
    }

    // checking if password is valid or not!
    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error:
          "Password should be 6 to 20 characters long with numeric, 1 lowercase and 1 uppercase letters!",
      });
    }

    // hashing the password using bcrpyt
    const hashedPassword = await bcrypt.hash(password, 10); // salting basically how many times u wanna repeat this!
    console.log(hashedPassword);

    const newUser = new User({
      personal_info: { fullname, password: hashedPassword, email, username },
    });

    await newUser.save();

    // sending response if everything is fine😊
    res.status(200).json({
      success: "Account created succuessfully",
      user: formatUserData(newUser),
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(500).json({
        error: "Email already exist!",
      });

    return res.status(500).json({
      error: error.message,
    });
  }
};

export default signUpUser;
