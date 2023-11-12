import React, { useContext } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Toaster, toast } from "react-hot-toast";

import axios from "axios";

import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FiKey } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  //  getting user from userCOntext!
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

  // sending data to the server
  const userAuthThroughServer = async (server, formData) => {
    try {
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + server, formData)
        .then(({ data }) => {
          toast.success(data.success);
          storeInSession("user", JSON.stringify(data.user));
          setUserAuth(data.user);
        })
        .catch(({ response }) => {
          toast.error(response.data.error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // handling onsubmit of form
  const handleSubmit = (e) => {
    // regex for email and password!
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    e.preventDefault();

    // server
    let server = type === "Sign-Up" ? "/users/signup" : "/users/signin";

    // from data
    let form = new FormData(formElement);
    let formData = {};

    for (let [key, value] of form.entries()) formData[key] = value;
    let { fullname, email, password } = formData;

    // if the fullname is length is less than 3 then return!
    if (fullname) {
      if (fullname.length < 3)
        return toast.error("Full name must be at least 3 letters long");
    }

    // if email length === 0 return
    if (!email.length) {
      return toast.error("Enter the email");
    }

    // checking if valid email or not with regex
    if (!emailRegex.test(email)) {
      return toast.error("Enter valid email");
    }

    // checking if password is valid or not!
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with 1 numeric, 1 lowercase and 1 uppercase letters!"
      );
    }

    userAuthThroughServer(server, formData);
  };

  // handling signIn/singUp with google
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    await authWithGoogle()
      .then((user) => {
        let server = "/google-auth";
        let formData = {
          access_token: user.accessToken,
        };
        userAuthThroughServer(server, formData);
      })
      .catch((err) => console.log(err));
  };

  return access_token ? (
    <Navigate to={"/"} />
  ) : (
    <AnimationWrapper keyVal={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-mono capitalize text-center mb-4">
            {type === "Sign-In" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "Sign-In" ? (
            <InputBox
              type="text"
              name={"fullname"}
              placeholder={"Full Name"}
              iconName={<BiUser className="input-icon" />}
            />
          ) : (
            ""
          )}

          <InputBox
            type="email"
            name={"email"}
            placeholder={"Email"}
            iconName={<HiOutlineMail className="input-icon" />}
          />

          <InputBox
            type="password"
            name={"password"}
            placeholder={"Password"}
            iconName={<FiKey className="input-icon" />}
          />

          <button
            className="btn-dark center mt-10 py-3"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={handleGoogleAuth}
          >
            <img src={googleIcon} alt="" className="w-4" />
            Continue with google
          </button>

          {type === "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center font-mono">
              Don't have account?
              <Link
                to={"/signup"}
                className="underline text-black text-xl ml-1"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center font-mono">
              Already have an account?
              <Link
                to={"/signin"}
                className="underline text-black text-xl ml-1"
              >
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
