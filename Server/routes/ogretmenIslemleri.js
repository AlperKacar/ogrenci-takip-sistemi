import express from "express";
import {ogrenciListele,ogretmenAdi,ogrenciEkle,ogrenciSil} from "../controllers/ogretmenIslemleri.js"
import {verifyToken} from "../middleware/auth.js"
const router = express.Router();



router.get("/TumOgrenciListele",ogrenciListele)
router.get("/ogretmenGetir",verifyToken,ogretmenAdi)
router.post("/ogrenci_ekle", verifyToken,ogrenciEkle);
router.delete("/ogrenci_sil/:_id", ogrenciSil);
export default router;