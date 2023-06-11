import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: { type: String, trim: true },
  nickname: { type: String, unique: true, trim: true },
  password: { type: String },
  studentnumber: { type: String },
  regDate: { type: String },
  hesapTuru: { type: String },
  phone: { type: Number },
  verifytoken: {
    type: String,
  },
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

const user = mongoose.model("user", userSchema);
export default user;
