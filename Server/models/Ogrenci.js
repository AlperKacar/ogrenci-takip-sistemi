import mongoose from "mongoose";

const ogrSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  password: { type: String },
  studentNumber: { type: String },
  tc: { type: Number },
  regDate: { type: String },
  parentPhone:{type:String},
  teacher_id:{type:String},
  grade:{type:String},
  term:{type:String},

  hayatBilgisi1:{type:Number},
  fenBilgisi1:{type:Number},
  matematik1:{type:Number},
  hayatBilgisi2:{type:Number},
  fenBilgisi2:{type:Number},
  matematik2:{type:Number},
  devamsizlikSayisi:{type:Number,default:0},
  tur:{type:String,default:"Ogrenci"},
  
});

const ogrenci = mongoose.model("ogrenci", ogrSchema);
export default ogrenci;
