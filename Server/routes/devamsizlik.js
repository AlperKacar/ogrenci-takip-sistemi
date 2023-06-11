import express from "express";
import { yoklamaGir } from "../controllers/devamsizlik";

const router = express.Router();



router.post("/yoklamaGir",yoklamaGir)