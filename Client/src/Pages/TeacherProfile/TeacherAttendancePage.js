import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, message, DatePicker } from "antd";
import axios from "axios";
import "./StudentGradesPage.css";
import { useSelector } from "react-redux";
import MenuPage from "../../Components/MenuPage";
import dayjs from "dayjs";
export default function TeacherAttendancePage() {
  const token = useSelector((state) => state.userInformation.token);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/ogretmen/TumOgrenciListele",
        {
          params: {
            search: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(response.data.Ogrenciler);
    } catch (error) {
      console.error("Öğrenciler alınırken hata oluştu:", error);
    }
  };
  const disableFutureDates = (current) => {
    return current && current > dayjs().endOf("day");
  };
  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  const handleAttendance = async (student) => {
    try {
      if (!selectedDate) {
        message.warning("Please select a date");
        return;
      }

     
      await axios.post(
        `http://localhost:3001/ogretmen/yoklama_al/${student.studentNumber}`,
        { date: selectedDate }
      );
      message.success("Yoklama Başarıyla Kaydedildi.");
      fetchStudents();
    } catch (error) {
      message.error("Yoklama Girilirken Bir Hata Oluştu.");
      message.error("An error occurred while taking attendance");
    }
  };

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "StudentNumber",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "devamsizlikSayisi",
      dataIndex: "devamsizlikSayisi",
      key: "devamsizlikSayisi",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Action",
      key: "action",
      render: (text, student) => (
        <div>
           <DatePicker disabledDate={disableFutureDates}
          onChange={(date)=>{setSelectedDate(dayjs(date).format("DD/MM/YYYY"))}} />

          <Button onClick={() => handleAttendance(student)}>
            Take Attendance
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="student-grades-page">
      <MenuPage />
      <Input
        type="text"
        placeholder="Öğrenci ara"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table dataSource={students} columns={columns} />
    </div>
  );
}
