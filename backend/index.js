import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/db.js";
import cloudinary from "cloudinary";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDIANRY_NAME,
  api_key: process.env.CLOUDIANRY_APIKEY,
  api_secret: process.env.CLOUDIANRY_SCERETKEY,
});

const app = express();
// using middlewares
app.use(express.json());

const port = process.env.PORT_URL;

// importing routes
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";

// using routes

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running ${port}`);
  dbConnection();
});
