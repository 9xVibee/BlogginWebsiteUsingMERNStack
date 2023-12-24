import User from "../../Schema/User.js";

const getUserProfile = async (req, res) => {
  try {
    let { userId: username } = req.body;

    // Finding user by username in db
    // by adding "-" this means this will not select the particular property/data
    User.findOne({ "personal_info.username": username })
      .select("-personal_info.password -google_auth -updatedAt -blogs")
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          error: err.message,
        });
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};
export default getUserProfile;
