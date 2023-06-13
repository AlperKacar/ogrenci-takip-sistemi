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
} from "../controllers/ogretmenIslemleri.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.get("/TumOgrenciListele", verifyToken, ogrenciListele);
router.get("/ogretmenGetir", verifyToken, ogretmenAdi);
router.post("/ogrenci_ekle", verifyToken, ogrenciEkle);
router.delete("/ogrenci_sil/:_id", ogrenciSil);
router.post("/ogrenci_notu_gir/:id", ogrenciNotuGir);
router.get("/announcements", getAnnouncements);
router.post("/new-announcement", newAnnouncement);
router.put("/update-announcement", updateAnnouncement);
router.delete("/remove-announcement", removeAnnouncement);

export default router;
