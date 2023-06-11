import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const keysecret = process.env.SECRET_KEY;
dotenv.config();
//-------------------------------------------------------------------------------------------LOGİN-----------------------------------------------------------------------------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser.isVerified === false)
      return res.status(400).json({ message: "mail onaylanmamış." });

    if (!existingUser)
      return res.status(400).json({ message: "Kullanıcı mevcut degil." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "geçersiz şifre" });

    const token = jwt.sign({ id: existingUser._id }, keysecret);
    res.status(200).json({ token, user: existingUser.hesapTuru });
  } catch (error) {
    res.status(500).json({ message: "birşey yanlış gitti." });
  }
};

//-------------------------------------------------------------------------------------------LOGİN-----------------------------------------------------------------------------------------------

////-------------------------------------------------------------------------------------------SİGNUP-----------------------------------------------------------------------------------------------

export const signup = async (req, res) => {
  function formatDate(date) {
    const yil = date.getUTCFullYear();
    const ay = date.getUTCMonth();
    const gun = date.getUTCDate();
    const tarih = `${gun}/${ay + 1}/${yil}`;
    return tarih;
  }

  try {
    const {
      name,
      surname,
      email,
      password,
      phone,
      business,
      il,
      ilce,
      hesapTuru,
      vdil,
      vdad,
      tcno,
      vkNo,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email adresi kayıtlıdır." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const bugun = new Date();
    const kayit_tarihi = formatDate(bugun);
    console.log(kayit_tarihi);
    let IlanSayisi;
    if (hesapTuru !== "Bireysel") {
      IlanSayisi = 0;
    }
    const newBusiness = new User({
      name,
      surname,
      email,
      password: passwordHash,
      phone,
      business,
      il,
      ilce,
      hesapTuru,
      vdil,
      vdad,
      tcno,
      vkNo,
      regDate: kayit_tarihi,
      isVerified: false,
      Ilan: IlanSayisi,
    });

    await newBusiness.save();
    res.status(200).json(newBusiness);
  } catch (error) {
    res.status(400).json(error);
    console.log(error.message);
  }
};
