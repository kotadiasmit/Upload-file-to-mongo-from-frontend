import express from "express";
import { FormController } from "../controller/controller.js";

const { uploadFormDetails } = FormController;

const router = express.Router();

router.post("/upload", uploadFormDetails);

export default router;
