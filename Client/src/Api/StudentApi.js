import axios from "axios";
import { toast } from "react-toastify";
const base_url = "http://localhost:3001";

export const getAnnouncements = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogrenci/announcements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const getNotlar = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogrenci/examscores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};
export const getDevamsizlikTarihleri = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogrenci/devamsizlik`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};
