import mongoose from "mongoose";

const yoklamaSchema = mongoose.Schema({
  ogr_num: { type: Number },
  tarih: { type: String },
});

const yoklama = mongoose.model("yoklamaTablosu", yoklamaSchema);
export default yoklama;
