import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true,
  },
  teacher_adı: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
