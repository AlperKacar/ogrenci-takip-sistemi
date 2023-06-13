import express from "express";
import {
  ogrenciListele,
  ogretmenAdi,
  ogrenciEkle,
  ogrenciSil,
  ogrenciNotuGir,
  getAnnouncements,
  newAnnouncement,
  removeAnnouncement,
  updateAnnouncement,
  resetStudentPassword,
  takeAttendance,
  updateStudent,
} from "../controllers/ogretmenIslemleri.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/TumOgrenciListele", verifyToken, ogrenciListele);
router.get("/ogretmenGetir", verifyToken, ogretmenAdi);
router.post("/ogrenci_ekle", verifyToken, ogrenciEkle);
router.post("/ogrenci_notu_gir/:id", ogrenciNotuGir);
router.get("/announcements", verifyToken, getAnnouncements);
router.post("/new-announcement", verifyToken, newAnnouncement);
router.post("/yoklama_al/:studentNumber", takeAttendance);
router.put("/update-announcement/:id", updateAnnouncement);
router.delete("/remove-announcement/:id", removeAnnouncement);
router.delete("/ogrenci_sil/:id", ogrenciSil);
router.put("/resetPassword/:id", resetStudentPassword);
router.put("/ogrenci_duzenle/:id", updateStudent);

export default router;
