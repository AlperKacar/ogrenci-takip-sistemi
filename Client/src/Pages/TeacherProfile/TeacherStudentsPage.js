import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  message,
  Popconfirm,
  Select,
  Form,
} from "antd";
import axios from "axios";
import "./StudentGradesPage.css";
import { useSelector } from "react-redux";
import MenuPage from "../../Components/MenuPage";

const { Option } = Select;

export default function TeacherStudentsPage() {
  const token = useSelector((state) => state.userInformation.token);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const [form] = Form.useForm();

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

  const handleResetPassword = async (student) => {
    try {
      await axios.put(
        `http://localhost:3001/ogretmen/resetPassword/${student._id}`
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
      await axios.delete(
        `http://localhost:3001/ogretmen/ogrenci_sil/${student._id}`
      );
      message.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      message.error("An error occurred while deleting the student");
    }
  };

  const handleEditStudent = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(
        `http://localhost:3001/ogretmen/ogrenci_duzenle/${editedStudent._id}`,
        values
      );
      message.success("Student information updated successfully");
      fetchStudents();
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating student information:", error);
      message.error("An error occurred while updating student information");
    }
  };

  const handleOpenEditModal = (student) => {
    setEditedStudent(student);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const gradeOptions = [
    { value: "1", label: "1. Sınıf" },
    { value: "2", label: "2. Sınıf" },
    { value: "3", label: "3. Sınıf" },
    { value: "4", label: "4. Sınıf" },
    { value: "5", label: "5. Sınıf" },
    { value: "6", label: "6. Sınıf" },
    { value: "7", label: "7. Sınıf" },
    { value: "8", label: "8. Sınıf" },
  ];

  const termOptions = [
    { value: "1", label: "1. Dönem" },
    { value: "2", label: "2. Dönem" },
  ];

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Student Number",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "Term",
      dataIndex: "term",
      key: "term",
    },
    {
      title: "TC",
      dataIndex: "tc",
      key: "tc",
    },
    {
      title: "Parent Phone",
      dataIndex: "parentPhone",
      key: "parentPhone",
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
          <Button type="primary" onClick={() => handleOpenEditModal(student)}>
            Edit Student
          </Button>
        </>
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

      <Modal
        title="Edit Student Information"
        open={editModalVisible}
        onOk={handleEditStudent}
        onCancel={handleCloseEditModal}
      >
        <Form
          form={form}
          onFinish={handleEditStudent}
          initialValues={editedStudent}
        >
          <Form.Item name="fullname" label="Full Name">
            <Input type="text" placeholder="Full Name" />
          </Form.Item>
          <Form.Item name="tc" label="TC">
            <Input type="text" placeholder="TC" />
          </Form.Item>
          <Form.Item name="parentPhone" label="Parent Phone">
            <Input type="text" placeholder="Parent Phone" />
          </Form.Item>
          <Form.Item name="term" label="Term">
            <Select placeholder="Term">
              {termOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="grade" label="Grade">
            <Select placeholder="Grade">
              {gradeOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
