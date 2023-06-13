import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, message, Popconfirm } from "antd";
import axios from "axios";
import "./StudentGradesPage.css";
import { useSelector } from "react-redux";
import MenuPage from "../../Components/MenuPage";

export default function TeacherStudentsPage() {
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

  const handleSaveStudent = async () => {
    try {
      await axios.put(`http://localhost:3001/students/${selectedStudent.id}`, {
        name: selectedStudent.name,
        number: selectedStudent.number,
        course: selectedCourse,
        grade: grade,
      });
      message.success("Student updated successfully");
      setEditModalVisible(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
      message.error("An error occurred while updating the student");
    }
  };

  const handleResetPassword = async (student) => {
    try {
      await axios.put(
        `http://localhost:3001/students/resetPassword/${student.id}`
      );
      message.success("Student password reset successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error resetting student password:", error);
      message.error("An error occurred while resetting student password");
    }
  };

  const handleDeleteStudent = async (student) => {
    try {
      await axios.delete(`http://localhost:3001/students/${student.id}`);
      message.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      message.error("An error occurred while deleting the student");
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
        <>
          <Button type="primary" onClick={() => handleEditGrade(student)}>
            Edit Grade
          </Button>
          <Button type="primary" onClick={() => handleResetPassword(student)}>
            Reset Password
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this student?"
            onConfirm={() => handleDeleteStudent(student)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete Student
            </Button>
          </Popconfirm>
        </>
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
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSaveStudent}
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
