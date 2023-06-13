import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu.js";
import ogrenci from "../models/Ogrenci.js";
import ogretmen from "../models/Ogretmen.js";
import Announcement from "../models/Announcement.js";

export const getSingleStudentDevamsizlik = async (req, res) => {
  const ogrenciBul = await ogrenci.findById(req.user.id);

  const devamsizlikGunleri = await yoklama.find({
    ogr_num: ogrenciBul.studentNumber,
  });
  const tarihler = devamsizlikGunleri.map((obj) => obj.tarih);

  if (devamsizlikGunleri)
    return res.status(200).json({
      tarihler: tarihler,
      devamsizlikSayisi: ogrenciBul.devamsizlikSayisi,
    });
  else return res.status(400).json({ message: "bir sorun oluştu." });
};
export const getPasswordController = async (req, res) => {
  try {
    const ogrenciBul = await ogrenci.findById(req.user.id);

    if (ogrenciBul) {
      const isVerifiedPassword = ogrenciBul.isVerifiedPassword;
      res.status(200).json({ isVerifiedPassword });
    } else {
      res.status(404).json({ message: "Öğrenci bulunamadı." });
    }
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;

  try {
    // Kullanıcıyı veritabanında bul ve şifresini güncelle
    const user = await ogrenci.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    user.password = newPassword;
    user.isVerifiedPassword = true;
    await user.save();

    res
      .status(200)
      .json({ message: "Şifre sıfırlama işlemi başarıyla tamamlandı." });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
export const getSingleStudentExams = async (req, res) => {
  const ogrenciBul = await ogrenci.findById(req.user.id);

  if (ogrenciBul) return res.status(200).json(ogrenciBul);
  else return res.status(400).json({ message: "bir sorun oluştu." });
};

export const getSingleStudentAnnouncements = async (req, res) => {
  const ogrenciBul = await ogrenci.findById(req.user.id);
  const duyuruGetir = await Announcement.find({
    teacher_id: ogrenciBul.teacher_id,
  });
  if (duyuruGetir) return res.status(200).json(duyuruGetir);
  else return res.status(400).json({ message: "bir sorun oluştu." });
};
