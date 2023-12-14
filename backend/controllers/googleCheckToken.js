import { getAuth } from "firebase-admin/auth";
import User from "../Schema/User.js";
import formatUserData from "../utils/helpers/formatUserData.js";

const googleCheckToken = async (req, res) => {
  let { access_token } = req.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;

      // converting image to high resolution
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.email personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) =>
          res.status(500).json({
            error: err.message,
          })
        );

      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            error:
              "This email was signed up without google. Please log in with password to access the account",
          });
        }
      } else {
        let username = email.split("@")[0];

        user = new User({
          personal_info: {
            fullname: name,
            email,
            username,
          },
          google_auth: true,
        });

        await user
          .save()
          .then((u) => {
            return u;
          })
          .catch((err) => {
            return res.status(500).json({
              error: err.message,
            });
          });
      }
      return res.status(200).json({
        success: "Google Authentication complete successfully!",
        user: formatUserData(user),
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err.message,
      })
    );
};

export default googleCheckToken;
