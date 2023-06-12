import express from "express";
import {ogrenciListele} from "../controllers/ogretmenIslemleri.js"
const router = express.Router();



router.get("/TumOgrenciListele",ogrenciListele)


export default router;