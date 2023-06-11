import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu"
import ogrenci from "../models/Ogrenci";


export const yoklamaGir=async (req,res)=>{
    try{
    const {
        ogr_num,
        tarih,
        ogretmen_id,
    }=req.body
    const existingOgr = await ogrenci.findOne({ ogr_num:ogr_num });
    if (existingOgr)
      {
        existingOgr.update({devamsizlikSayisi:devamsizlikSayisi+1})
        const newDevamsizlik = new yoklama({
           tarih,
           ogr_num,
           ogretmen_id
          });
          await newDevamsizlik.save();
          res.status(200).json({message:"Kayıt İşlemi Başarıyla Tamamlandı."});
      }
      else
        res.status(400).json({ message: "Bu numaraya ait öğrenci bulunamadı."});
    }catch(error){
        res.status(400).json({ message: "Bir sorun oluştu."});
    }
    }