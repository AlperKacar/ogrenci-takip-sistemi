import express from "express";
import {
  stdLogin,
  stdSignup,
  teacherLogin,
  teacherSignup,
  stdDelete,
} from "../controllers/userAuth.js";

const router = express.Router();

router.post("/student/login", stdLogin);
router.post("/teacher/Login", teacherLogin);
router.post("/student/Signup", stdSignup);
router.post("/teacher/Signup", teacherSignup);
router.delete("/deletestudent", stdDelete);
export default router;
