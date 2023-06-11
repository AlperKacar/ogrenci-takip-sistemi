import mongoose from "mongoose";

const ogrSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  password: { type: String },
  studentNumber: { type: String },
  tcno: { type: Number },
  regDate: { type: String },
  veliTel:{type:String},
  hayatBilgisi1:{type:Number},
  fenBilgisi1:{type:Number},
  matematik1:{type:Number},
  hayatBilgisi2:{type:Number},
  fenBilgisi2:{type:Number},
  matematik2:{type:Number},
  ogretmen_id:{type:String},
  devamsizlikSayisi:{type:Number,default:0},
  tur:{type:String,default:"Ogrenci"},
  verifytoken: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

const ogrenci = mongoose.model("ogrenci", ogrSchema);
export default ogrenci;
