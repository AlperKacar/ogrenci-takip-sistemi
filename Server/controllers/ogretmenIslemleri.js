import jwt from "jsonwebtoken";
import yoklama from "../models/YoklamaTablosu.js";
import ogrenci from "../models/Ogrenci.js";
import bcrypt from "bcrypt";
import ogretmen from "../models/Ogretmen.js";
import Announcement from "../models/Announcement.js";

function formatDate(date) {
  const yil = date.getUTCFullYear();
  const ay = date.getUTCMonth();
  const gun = date.getUTCDate();
  const tarih = `${gun}/${ay + 1}/${yil}`;
  return tarih;
}
//Öğrencileri Listele
export const ogrenciListele = async (req, res) => {
  try {
    const teacher = await ogretmen.findById(req.user.id);
    const { search } = req.query;

    let query = {}; // Öğretmen kimliğine göre öğrencileri filtrelemek için sorgu
    if (search) {
      query.$or = [{ fullname: { $regex: search, $options: "i" } }];

      const searchNumber = parseInt(search);
      if (!isNaN(searchNumber)) {
        query.$or.push({ studentNumber: searchNumber });
      }
    }
    console.log(search);
    const Ogrenciler = await ogrenci.find(query);
    if (Ogrenciler.length === 0) {
      // Eğer öğrenci bulunamadıysa, tüm öğrencileri getir
      const allStudents = await ogrenci.find({ teacher_id: teacher });
      res.status(200).json({ Ogrenciler: allStudents });
    } else {
      res.status(200).json({ Ogrenciler });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bir hata oluştu. Öğrenciler görüntülenemiyor." });
  }
};

//Öğrenci notu girme
export const ogrenciNotuGir = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { selectedExam, newGrade, attended } = req.body;

    const Öğrenci = await ogrenci.findById(studentId);
    if (!Öğrenci) {
      return res.status(404).json({ message: "Öğrenci Bulunamadı." });
    }
    if (attended) {
      Öğrenci[selectedExam] = newGrade;
    } else {
      Öğrenci[selectedExam] = "GM";
    }
    // Ders adı ve notunu güncelle
    await Öğrenci.save();
    res.status(200).json({ message: "Not Güncellendi." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bir hata oluştu. Öğrenci notu güncellenemedi." });
  }
};

// Öğrenci Ekle
export const ogrenciEkle = async (req, res) => {
  try {
    const { fullname, parentPhone, tc, grade, term } = req.body;
    const teacher = await ogretmen.findById(req.user.id);
    teacher.ogrenciSayisi += 1;
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
      password: new_number,
      studentNumber: new_number,
      tc,
      regDate: kayit_tarihi,
      parentPhone,
      teacher_id: teacher._id,
      grade,
      term,
    });
    await newOgrenci.save();
    res.status(200).json({ message: "Kayıt İşlemi Başarıyla Tamamlandı." });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Öğrenci kayıt edilirken bir sorunla karşılaşıldı." });
    console.log(error.message);
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
export const ogretmenAdi = async (req, res) => {
  const teacher = await ogretmen.findById(req.user.id);
  const teacherName = teacher.fullname;
  if (teacher) return res.status(200).json(teacherName);
  else return res.status(200).json({ message: "bir sorun oluştu." });
};

//Öğretmene ait duyuruları getir
export const getAnnouncements = async (req, res) => {
  try {
    const teacher = await ogretmen.findById(req.user.id);
    const announcements = await Announcement.findOne({
      teacher_id: teacher._id,
    });

    res.status(200).json(announcements);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Duyurular getirilirken Sorun Oluştu." });
  }
};

//öğretmene ait yeni duyuru oluştur
export const newAnnouncement = async (req, res) => {
  try {
    const teacher = await ogretmen.findById(req.user.id);
    const announcements = await Announcement.findById({
      teacher_id: teacher._id,
    });

    res.status(200).json(announcements);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Öğrenci Silinirken Bir Sorun Çıktı." });
  }
};

//öğretmene ait  duyuruyu sil.
export const removeAnnouncement = async (req, res) => {
  const announcementId = req.params.id;
  const teacherId = req.user.id; // Öğretmen kimliği

  try {
    const announcement = await Announcement.findOneAndRemove({
      _id: announcementId,
      teacher_id: teacherId,
    });

    if (!announcement) {
      return res.status(404).json({ message: "Duyuru bulunamadı." });
    }

    res.status(200).json({ message: "Duyuru başarıyla kaldırıldı." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Duyuru kaldırılırken bir sorun oluştu." });
  }
};

//Öğretmene ait duyuruyu düzenle.
export const updateAnnouncement = async (req, res) => {
  const announcementId = req.params.id;
  const teacherId = req.user.id; // Öğretmen kimliği
  const { title, content } = req.body;

  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: announcementId, teacher_id: teacherId },
      { title, content },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Duyuru bulunamadı." });
    }

    res.status(200).json(announcement);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Duyuru düzenlenirken bir sorun oluştu." });
  }
};
