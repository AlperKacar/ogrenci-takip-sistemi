import express from "express";
import {
  stdLogin,
  teacherLogin,
  teacherSignup,
} from "../controllers/userAuth.js";

const router = express.Router();

router.post("/student/login", stdLogin);
router.post("/teacher/Login", teacherLogin);
router.post("/teacher/Signup", teacherSignup);

export default router;
