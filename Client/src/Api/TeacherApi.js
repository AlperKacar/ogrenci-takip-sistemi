// api.js
import axios from "axios";
const base_url="http://localhost:3001"
export const fetchTeacherName = async (token) => {
  try {
    const response = await axios.get(
      `${base_url}/ogretmen/ogretmenGetir`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    
  } catch (error) {}
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

export const addStudent = async (values,token) => {
  try {
    await axios.post(`${base_url}/ogretmen/ogrenci_ekle`, values, {
      headers: {
        Authorization:` Bearer ${token}`,
      },
    })}catch (error) {
    console.log(error);
  }
};

