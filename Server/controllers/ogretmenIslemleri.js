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
export const ogrenciListele = async (req, res) => {
  try {
    const teacherId = req.user.id; // Öğretmenin kimliği

    const { search } = req.query;

    let query = { teacher_id: teacherId }; // Öğretmen kimliğine göre öğrencileri filtrelemek için sorgu
    if (search) {
      query.$or = [{ fullname: { $regex: search, $options: "i" } }];

      const searchNumber = parseInt(search);
      if (!isNaN(searchNumber)) {
        query.$or.push({ studentNumber: searchNumber });
      }
    }
    const Ogrenciler = await ogrenci.find(query);
    res.status(200).json({ Ogrenciler });
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
    const { selectedExam, newGrade, attended, selectedCourse } = req.body;

    const lastChar = selectedExam.charAt(selectedExam.length - 1);
    const dersAdi = selectedCourse + lastChar;
    console.log("ders", dersAdi);
    console.log("selectedExam", selectedExam);
    console.log("grade", newGrade);
    console.log("selectedCourse", selectedCourse);

    const Öğrenci = await ogrenci.findById(studentId);
    if (!Öğrenci) {
      return res.status(404).json({ message: "Öğrenci Bulunamadı." });
    }
    if (attended) {
      Öğrenci[dersAdi] = newGrade;
    } else {
      Öğrenci[dersAdi] = "GM";
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
      isVerifiedPassword: false,
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
    const studentId = req.params.id;
    console.log(studentId);
    const existingUser = await ogrenci.findOneAndDelete({
      _id: studentId,
    });

    if (existingUser) {
      return res.status(200).json({
        message: `${existingUser.fullname} adlı öğrenci başarıyla silinmiştir.`,
      });
    }

    return res.status(404).json({ message: "Öğrenci bulunamadı." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Öğrenci silinirken bir sorun oluştu." });
  }
};

//Öğrenci bilgileri değiştir
export const resetStudentPassword = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await ogrenci.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Öğrenci bulunamadı." });
    }

    // Şifre sıfırlama işlemi
    const newPassword = student.studentNumber; // Yeni şifre olarak okul numarasını kullanıyoruz
    student.password = newPassword;
    await student.save();

    return res
      .status(200)
      .json({ message: "Öğrencinin bilgileri güncellendi." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Güncelleme işlemi sırasında bir hata oluştu." });
  }
};

//Öğretmen Adı Gönder
export const ogretmenAdi = async (req, res) => {
  const teacher = await ogretmen.findById(req.user.id);
  const teacherName = teacher.fullname;
  if (teacher) return res.status(200).json(teacherName);
  else return res.status(400).json({ message: "bir sorun oluştu." });
};

//Öğretmene ait duyuruları getir
export const getAnnouncements = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const announcements = await Announcement.find({ teacher_id: teacherId });

    res.status(200).json(announcements);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Duyurular getirilirken Sorun Oluştu." });
  }
};
//Yeni Duyuru
export const newAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const teacherId = req.user.id; // Öğretmen kimliği
    const teacher = await ogretmen.findById(teacherId);
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const announcement = await Announcement.create({
      title,
      content,
      teacher_id: teacherId,
      date: formattedDate,
      teacher_adı: teacher.fullname,
    });

    res.status(200).json({ announcement, message: "Duyuru Oluşturuldu." });
  } catch (error) {
    return res.status(400).json({ message: "Duyuru oluşturulamadı." });
  }
};

//öğretmene ait  duyuruyu sil.
export const removeAnnouncement = async (req, res) => {
  const announcementId = req.params.id;
  try {
    const announcement = await Announcement.findByIdAndRemove(announcementId);

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
  const { title, content } = req.body;

  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: announcementId },
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

// Öğretmenin yoklama alması
export const takeAttendance = async (req, res) => {
  try {
    const { date } = req.body;
    const studentNumber = req.params.studentNumber;

    const öğrenci = await ogrenci.findOne({ studentNumber: studentNumber });

    // Öğrenciye ait yoklama kaydını oluşturuyoruz
    const attendance = await yoklama.create({
      ogr_num: studentNumber,
      tarih: date,
    });

    // Öğrencinin devamsızlık sayısını artırıyoruz
    öğrenci.devamsizlikSayisi += 1;
    await öğrenci.save();

    res.status(200).json({ attendance, message: "Yoklama alındı." });
  } catch (error) {
    return res.status(400).json({ message: "Yoklama alınamadı." });
  }
};

// Öğrenci bilgilerini güncelleme
export const updateStudent = async (req, res) => {
  try {
    const { fullname, tc, parentPhone, grade, term } = req.body;
    const studentId = req.params.id;
    console.log(fullname, tc, parentPhone, grade, term);
    const student = await ogrenci.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Öğrenci bulunamadı." });
    }
    //Güncelleme
    student.fullname = fullname;
    student.tc = tc;
    student.parentPhone = parentPhone;
    student.grade = grade;
    student.term = term;
    await student.save();

    return res
      .status(200)
      .json({ message: "Öğrencinin bilgileri güncellendi." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Güncelleme işlemi sırasında bir hata oluştu." });
  }
};
