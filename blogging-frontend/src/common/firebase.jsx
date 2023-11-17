import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyDrY7-l12F-uqxU8e6zw51HQQKaAoXZ7YU",
  authDomain: "blogging-website-eb55d.firebaseapp.com",
  projectId: "blogging-website-eb55d",
  storageBucket: "blogging-website-eb55d.appspot.com",
  messagingSenderId: "1058331217214",
  appId: "1:1058331217214:web:55bd1dfb5c86fa2d20706f",
  measurementId: "G-0ZGMW4C1J1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      toast.error("Trouble login through google");
      console.log(err);
    });

  return user;
};
