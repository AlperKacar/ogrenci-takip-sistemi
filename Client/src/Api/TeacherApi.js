import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:3001";

export const fetchAnnouncements = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogretmen/announcements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return []; // Hata durumunda boş bir dizi döndür
  }
};

export const createAnnouncement = async (values, token) => {
  try {
    const response = await axios.post(
      `${base_url}/ogretmen/new-announcement`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const editAnnouncement = async (id, values) => {
  try {
    const response = await axios.put(
      `${base_url}/ogretmen/update-announcement/${id}`,
      values
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}/ogretmen/remove-announcement/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const addStudent = async (values, token) => {
  try {
    const response = await axios.post(
      `${base_url}/ogretmen/ogrenci_ekle`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
