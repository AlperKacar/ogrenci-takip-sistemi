import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu.js"
import ogrenci from "../models/Ogrenci.js";
import bcrypt from "bcrypt"
import ogretmen from "../models/Ogretmen.js";

function formatDate(date) {
  const yil = date.getUTCFullYear();
  const ay = date.getUTCMonth();
  const gun = date.getUTCDate();
  const tarih = `${gun}/${ay + 1}/${yil}`;
  return tarih;
}
//Öğrencileri Listele
export const ogrenciListele=async (req,res)=>{
    
    try {
        const Ogrenciler = await ogrenci.find();
    
        res.status(200).json({ Ogrenciler });
      } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu. Öğrenciler görüntülenemiyor." });
      }

}
// Öğrenci Ekle
export const ogrenciEkle = async (req, res) => {
  try {
    const { fullname,  parentPhone, tc,grade,term} = req.body;
    const teacher = await ogretmen.findById(req.user.id);
    teacher.ogrenciSayisi+=1
    teacher.save();

    const existingUser = await ogrenci.findOne({ tc: tc });
    
    if (existingUser) {
      return res.status(400).json({ message: "Bu öğrenci zaten kayıtlıdır." });
    }
    let ogr_controller;
    let new_number;
    do {
      new_number = Math.floor(Math.random() * 10000);
      ogr_controller = ogrenci.findOne({ studentNumber: new_number });
    } while (!ogr_controller);

    const bugun = new Date();
    const kayit_tarihi = formatDate(bugun);
    
    

    const newOgrenci = new ogrenci({
      fullname,
      password:new_number,
      studentNumber: new_number,
      tc,
      regDate: kayit_tarihi,
      parentPhone,
      teacher_id:teacher._id,
      grade,
      term
    });
    await newOgrenci.save();
    res.status(200).json({ message: "Kayıt İşlemi Başarıyla Tamamlandı." });
  } catch (error) {
    res.status(400).json({ message: "Öğrenci kayıt edilirken bir sorunla karşılaşıldı." });
    console.log(error.message)
  }
};

//Öğrenci Silme
export const ogrenciSil = async (req, res) => {
  try {
    const { studentNumber } = req.body;

    const existingUser = await ogrenci.findOneAndDelete({
      studentNumber: studentNumber,
    });
    if (existingUser) {
      return res.status(200).json({
        message: `${existingUser.fullname} adlı öğrenci başarıyla silinmiştir.`,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Öğrenci Silinirken Bir Sorun Çıktı." });
  }
};



//Öğretmen Adı Gönder
export const ogretmenAdi=async(req,res)=>{
  const teacher = await ogretmen.findById(req.user.id);
  const teacherName=teacher.fullname
if(teacher)
return res.status(200).json(teacherName);
else
return res.status(200).json({message:"bir sorun oluştu."})

}

