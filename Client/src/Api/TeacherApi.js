import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:3001";

export const fetchTeacherName = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogretmen/ogretmenGetir`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.data.message);
      return null;
    }
  } catch (error) {
    toast.error("Öğretmen adı alınamadı.");
    return null;
  }
};
export const fetchAnnouncements = async (token) => {
  try {
    const response = await axios.get(`${base_url}/ogretmen/announcements`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
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
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
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
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}/ogretmen/remove-announcement/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (values, token) => {
  try {
    const response = await axios.post(
      `${base_url}/ogretmen/ogrenci_ekle`,
      values,
      {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
