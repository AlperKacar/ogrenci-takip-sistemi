import mongoose from "mongoose";

const ogretmenSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  nickname: { type: String, unique: true, trim: true },
  password: { type: String },
  regDate: { type: String },
  phone: { type: Number },
  ogrenciSayisi: { type: Number, default:0 },
  verifytoken: {
    type: String,
  },
  tur:{type:String,default:"Ogretmen"},
  tcno: { type: Number },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
 
  
});

const ogretmen = mongoose.model("ogretmen", ogretmenSchema);
export default ogretmen;
