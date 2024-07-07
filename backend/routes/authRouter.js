import express from "express";
import { registerUser } from "../controllers/authControllers.js";
import uploadfile from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", uploadfile, registerUser);

export default router;
