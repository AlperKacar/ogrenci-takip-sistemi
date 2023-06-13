import express from "express";
import {
  getSingleStudentAnnouncements,
  getSingleStudentDevamsizlik,
  getSingleStudentExams,
  getPasswordController,
  resetPassword,
} from "../controllers/ogrenciIslemleri.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/announcements", verifyToken, getSingleStudentAnnouncements);
router.get("/devamsizlik", verifyToken, getSingleStudentDevamsizlik);
router.get("/examscores", verifyToken, getSingleStudentExams);
router.get("/password_controller", verifyToken, getPasswordController);
router.post("/reset-password", verifyToken, resetPassword);

export default router;
