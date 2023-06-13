import mongoose from "mongoose";

const ogrSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  password: { type: String },
  studentNumber: { type: String },
  tc: { type: Number },
  regDate: { type: String },
  parentPhone: { type: String },
  teacher_id: { type: String },
  grade: { type: String },
  term: { type: String },

  hayatBilgisi1: { type: String },
  fenBilgisi1: { type: String },
  matematik1: { type: String },
  hayatBilgisi2: { type: String },
  fenBilgisi2: { type: String },
  matematik2: { type: String },
  hayatBilgisi3: { type: String },
  fenBilgisi3: { type: String },
  matematik3: { type: String },
  devamsizlikSayisi: { type: Number, default: 0 },
  tur: { type: String, default: "Ogrenci" },
});

const ogrenci = mongoose.model("ogrenci", ogrSchema);
export default ogrenci;
