import express from "express";
import {
  getSingleStudentAnnouncements,
  getSingleStudentDevamsizlik,
  getSingleStudentExams
} from "../controllers/ogrenciIslemleri.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/announcements", verifyToken,getSingleStudentAnnouncements);
router.get("/devamsizlik", verifyToken,getSingleStudentDevamsizlik);
router.get("/examscores",verifyToken,getSingleStudentExams );


export default router;
