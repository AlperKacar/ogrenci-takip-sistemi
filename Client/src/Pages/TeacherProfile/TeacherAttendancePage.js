import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Checkbox, Input } from "antd";
import axios from "axios";
import "./TeacherAttendancePage.css";
import { useSelector } from "react-redux";
import MenuPage from "../../Components/MenuPage";

export default function TeacherAttendancePage() {
  const token = useSelector((state) => state.userInformation.token);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.students);
      setAttendance(
        response.data.students.map((student) => ({
          id: student.id,
          name: student.name,
          attended: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveAttendance = async () => {
    try {
      await axios.post("http://localhost:3001/attendance", attendance, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const handleToggleAttendance = (id) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.id === id
          ? { ...student, attended: !student.attended }
          : student
      )
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Attendance",
      dataIndex: "attended",
      key: "attended",
      render: (attended, student) => (
        <Checkbox
          checked={attended}
          onChange={() => handleToggleAttendance(student.id)}
        />
      ),
    },
  ];

  return (
    <div className="teacher-attendance-page">
      <div className="attendance-content">
        <h1>Teacher's Name</h1>
        <Input
          type="text"
          placeholder="Search students"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="primary" onClick={() => setEditModalVisible(true)}>
          Take Attendance
        </Button>
      </div>

      <div className="attendance-table">
        <Table dataSource={filteredStudents} columns={columns} />
      </div>

      <Modal
        title="Take Attendance"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleSaveAttendance}
      >
        <Table
          dataSource={filteredStudents}
          columns={columns}
          pagination={false}
        />
      </Modal>

      <MenuPage />
    </div>
  );
}
