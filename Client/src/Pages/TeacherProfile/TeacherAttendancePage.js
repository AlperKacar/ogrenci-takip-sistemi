import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import axios from "axios";
import "./StudentGradesPage.css";
import { useSelector } from "react-redux";
import MenuPage from "../../Components/MenuPage";

export default function TeacherAttendancePage() {
  const token = useSelector((state) => state.userInformation.token);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [grade, setGrade] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleEditGrade = (student) => {
    setSelectedStudent(student);
    setSelectedCourse(student.course);
    setGrade(student.grade);
    setEditModalVisible(true);
  };

  const handleSaveGrade = async () => {
    try {
      await axios.put(
        `http://localhost:3001/students/${selectedStudent.number}/grade`,
        {
          grade: grade,
        }
      );
      message.success("Grade updated successfully");
      setEditModalVisible(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating grade:", error);
      message.error("An error occurred while updating the grade");
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
      title: "Term",
      dataIndex: "term",
      key: "term",
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
        <Button type="primary" onClick={() => handleEditGrade(student)}>
          Edit Grade
        </Button>
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

      <Modal
        title="Edit Grade"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSaveGrade}
      >
        <p>Course: {selectedCourse}</p>
        <Input
          type="number"
          placeholder="Enter grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </Modal>
    </div>
  );
}
