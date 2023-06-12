import mongoose from "mongoose";

const ogretmenSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  nickname: { type: String, unique: true, trim: true },
  password: { type: String },
  regDate: { type: String },
  phone: { type: Number },
  ogrenciSayisi: { type: Number, default:0 },
  tur:{type:String,default:"Ogretmen"},
  tcno: { type: Number },
  
 
  
});

const ogretmen = mongoose.model("ogretmen", ogretmenSchema);
export default ogretmen;
