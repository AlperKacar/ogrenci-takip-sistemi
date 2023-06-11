// api.js
import axios from "axios";

export const fetchTeacherName = async () => {
  try {
    const response = await axios.get("/api/teacher");
    return response.data.teacherName;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAnnouncements = async () => {
  try {
    const response = await axios.get("/api/announcements");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createAnnouncement = async (values) => {
  try {
    await axios.post("/api/announcements", values);
  } catch (error) {
    console.log(error);
  }
};

export const editAnnouncement = async (id, values) => {
  try {
    await axios.put(`/api/announcements/${id}`, values);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    await axios.delete(`/api/announcements/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (values) => {
  try {
    await axios.post("/api/students", values);
  } catch (error) {
    console.log(error);
  }
};
