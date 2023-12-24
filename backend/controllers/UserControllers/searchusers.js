import User from "../../Schema/User.js";

const searchUsers = (req, res) => {
  let { query } = req.body;

  User.find({ "personal_info.username": new RegExp(query, "i") })
    .limit(50)
    .then((users) => {
      return res.status(200).json({
        users,
      });
    })
    .catch((err) => {
      console.log("Error in Search Route ", err.message);
      return res.status(500).json({
        error: err.message,
      });
    });
};
export default searchUsers;
