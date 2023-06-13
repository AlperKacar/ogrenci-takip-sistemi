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

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);
  const disableFutureDates = (current) => {
    return current && current > dayjs().endOf("day");
  };
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
      console.error("Error taking attendance:", error);
      message.error("Yoklama Girilirken Bir Hata Oluştu.");
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
      <div className="header">
        <div className="left-section">
          <h1>Teacher's Name</h1>
        </div>
        <div className="right-section">
          <Input
            type="text"
            placeholder="Search students"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <MenuPage />
      <Table dataSource={students} columns={columns} />
      <div></div>
    </div>
  );
}
