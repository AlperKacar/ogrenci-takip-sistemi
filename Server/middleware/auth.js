import jwt from "jsonwebtoken";
const keysecret = process.env.SECRET_KEY;
export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(403).send("Erişim Reddedildi");
    }
    const authToken = token.slice(7);

    jwt.verify(authToken, keysecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Geçersiz token" });
      }

      req.user = decoded;

      next();
    });
  } catch (error) {
    console.log("Token doğrulama hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
