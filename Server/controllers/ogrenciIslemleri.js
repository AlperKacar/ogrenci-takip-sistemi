import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu.js";
import ogrenci from "../models/Ogrenci.js";
import ogretmen from "../models/Ogretmen.js";
import Announcement from "../models/Announcement.js";


export const getSingleStudentDevamsizlik= async(req,res)=>{

    const ogrenciBul = await ogrenci.findById(req.user.id);

    const devamsizlikGunleri=await yoklama.find({ogr_num:ogrenciBul.studentNumber})

    if (devamsizlikGunleri) return res.status(200).json(devamsizlikGunleri.tarih);
  else return res.status(400).json({ message: "bir sorun oluştu." });

}

export const getSingleStudentExams=async (req,res)=>{

    const ogrenciBul = await ogrenci.findById(req.user.id);
    
    if(ogrenciBul) return res.status(200).json(ogrenciBul)
    else return res.status(400).json({ message: "bir sorun oluştu." });
}

export const getSingleStudentAnnouncements=async(req,res)=>{

    const ogrenciBul = await ogrenci.findById(req.user.id);
    const duyuruGetir= await Announcement.find({teacher_id:ogrenciBul.teacher_id});
    if (duyuruGetir) return res.status(200).json(duyuruGetir);
    else return res.status(400).json({ message: "bir sorun oluştu." });
  
}