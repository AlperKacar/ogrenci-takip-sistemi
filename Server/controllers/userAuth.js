import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ogretmen from "../models/Ogretmen.js";
import ogrenci from "../models/Ogrenci.js";
import dotenv from "dotenv"
dotenv.config();
const keysecret = process.env.SECRET_KEY;

function formatDate(date) {
  const yil = date.getUTCFullYear();
  const ay = date.getUTCMonth();
  const gun = date.getUTCDate();
  const tarih = `${gun}/${ay + 1}/${yil}`;
  return tarih;
}
//-------------------------------------------------------------------------------------------LOGİN-----------------------------------------------------------------------------------------------
export const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await ogretmen.findOne({ nickname: username });
    if (!existingUser)
      return res.status(400).json({ message: "Öğretmen Kaydı Bulunamadı." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Şifreyi yanlış girdiniz. Lütfen kontrol edin." });

    const token = jwt.sign({ id: existingUser._id }, keysecret);

    res.status(200).json({ token, user: existingUser.tur, message: "Giriş Başarılı."});
  } catch (error) {
    res.status(500).json({ message: "Giriş Yaparken Bir Sorun Oluştu." });
  }
};

//-------------------------------------------------------------------------------------------LOGİN-----------------------------------------------------------------------------------------------

export const stdLogin = async (req, res) => {
  try {
    const { tc, password } = req.body;
    const existingUser = await ogrenci.findOne({ tc: tc });
    if (!existingUser)
      return res
        .status(400)
        .json({ message: "Öğrenci Kaydı Bulunamadı. Öğretmeninize danışın." });

    

      if(password!==existingUser.password)
      return res.status(400).json({
        message:
          "Şifreyi yanlış girdiniz. Lütfen kontrol edin. Eğer doğru girdiğinizi düşünüyorsanız öğretmeninize danışın.",
      });

    const token = jwt.sign({ id: existingUser._id }, keysecret);
    res
      .status(200)
      .json({ token, user: existingUser.tur, message: "Giriş Başarılı." });
  } catch (error) {
    res.status(500).json({ message: "Giriş Yaparken Bir Sorun Oluştu." });
  }
};
//-------------------------------------------------------------------------------------------LOGİN-----------------------------------------------------------------------------------------------

////-------------------------------------------------------------------------------------------SİGNUP-----------------------------------------------------------------------------------------------

export const teacherSignup = async (req, res) => {
  try {
    const { fullName, username, password, telefonNo, tcKimlikNo } = req.body;
    const existingUser = await ogretmen.findOne({ nickname: username });
    if (existingUser)
      return res.status(400).json({ message: "Email adresi kayıtlıdır." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const bugun = new Date();
    const kayit_tarihi = formatDate(bugun);
    const newOgretmen = new ogretmen({
      fullname: fullName,
      nickname: username,
      password: passwordHash,
      phone: telefonNo,
      tcno: tcKimlikNo,
      regDate: kayit_tarihi,
    });

    await newOgretmen.save();
    res.status(200).json({ message: "Kayıt İşlemi Başarıyla Tamamlandı." });
  } catch (error) {
    res.status(400).json({ message: "Öğretmen Kayıt Edilemedi." });
  }
};


////-------------------------------------------------------------------------------------------SİGNUP-----------------------------------------------------------------------------------------------
// Öğrenci Adı
export const ogrenciAdi=async(req,res)=>{

 const student = await ogrenci.findById(req.user.id);
  const ogrenciName=student.fullname
if(student)
return res.status(200).json(ogrenciName);
else
return res.status(200).json({message:"bir sorun oluştu."})


}