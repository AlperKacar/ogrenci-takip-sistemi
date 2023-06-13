import express from "express";
import {
  ogrenciAdi,
  stdLogin,
  teacherLogin,
  teacherSignup,
} from "../controllers/userAuth.js";
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

router.post("/student/login", stdLogin);
router.post("/teacher/Login", teacherLogin);
router.post("/teacher/Signup", teacherSignup);
router.get("/ogrenciAdiGonder",verifyToken,ogrenciAdi)

export default router;
