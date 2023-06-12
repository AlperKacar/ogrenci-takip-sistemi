import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu.js"
import ogrenci from "../models/Ogrenci.js";



export const ogrenciListele=async (req,res)=>{
    
    try {
        const Ogrenciler = await ogrenci.find();
    
        res.status(200).json({ Ogrenciler });
      } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu. Öğrenciler görüntülenemiyor." });
      }

}

