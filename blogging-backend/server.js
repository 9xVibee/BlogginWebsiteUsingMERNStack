import express, { json } from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccountKey from "./blogging-website-eb55d-firebase-adminsdk-4r1yg-64aaffc564.json" assert { type: "json" };
import { v2 as cloudinary } from "cloudinary";

// importing routes
import userRoutes from "./routes/userRoutes.js";
import googleRoute from "./routes/googleRoute.js";

// using the express
const app = express();

// google
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// using middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// to use .env file
dotenv.config();

// signup route
app.use("/users", userRoutes);
app.use("/google-auth", googleRoute);

// calling the database
connectDb();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
});

app.listen(process.env.PORT, () => {
  console.log("http://localhost:3000");
});
