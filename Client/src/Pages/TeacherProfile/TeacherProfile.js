import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Modal, Layout, Select } from "antd";
import MenuPage from "../../Components/MenuPage";
import "./TeacherPage.css";
import { Helmet } from "react-helmet";
import {
  fetchTeacherName,
  fetchAnnouncements,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
  addStudent,
} from "../../Api/TeacherApi";
import { useSelector } from "react-redux";
const { Header, Content } = Layout;
const { Option } = Select;
const TeacherPage = () => {
  const  token = useSelector((state) => state.userInformation.token);
  const [teacherName, setTeacherName] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Öğretmen adını API'den al
    fetchTeacherData();
    // Duyuruları API'den al
    fetchAnnouncements();
  }, []);
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
  const fetchTeacherData = async () => {
    const teacherData = await fetchTeacherName(token);
    setTeacherName(teacherData);
  };

  const fetchAnnouncementData = async () => {
    const announcementData = await fetchAnnouncements();
    setAnnouncements(announcementData);
  };

  const handleCreateAnnouncement = async (values) => {
    await createAnnouncement(values);
    form.resetFields();
    fetchAnnouncementData();
  };

  const handleEditAnnouncement = async (id, values) => {
    await editAnnouncement(id, values);
    fetchAnnouncementData();
  };

  const handleDeleteAnnouncement = async (id) => {
    await deleteAnnouncement(id);
    fetchAnnouncementData();
  };

  const handleAddStudent = async (values) => {
    await addStudent(values,token);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Başlık",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "İçerik",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Düzenle",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() =>
            handleEditAnnouncement(record.id, {
              title: "Yeni Başlık",
            })
          }
        >
          Düzenle
        </Button>
      ),
    },
    {
      title: "Sil",
      key: "delete",
      render: (_, record) => (
        <Button type="link" onClick={() => handleDeleteAnnouncement(record.id)}>
          Sil
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Öğretmen Sayfası</title>
      </Helmet>
      <Header>
        <div className="header-container">
          <h1 className="header-title">Öğretmen Sayfası</h1>
          <div className="teacher-info">
            <span className="teacher-name">Öğretmen Adı: </span>
          </div>
        </div>
      </Header>
      <div className="body-display">
        <MenuPage />
        <Content className="teacher-page">
          <h1>{teacherName}</h1>
          <div className="add-student-button">
            <Button type="primary" onClick={showModal}>
              Öğrenci Ekle
            </Button>
            <Modal
              title="Öğrenci Ekle"
              open={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form onFinish={handleAddStudent}>
                <Form.Item
                  name="tc"
                  label="TC Kimlik Numarası"
                  rules={[
                    {
                      required: true,
                      message: "TC Kimlik Numarası gereklidir",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="fullname"
                  label="Ad Soyad"
                  rules={[{ required: true, message: "Ad Soyad gereklidir" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="parentPhone"
                  label="Veli Telefonu"
                  rules={[
                    { required: true, message: "Veli Telefonu gereklidir" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="grade"
                  label="Sınıf"
                  rules={[{ required: true, message: "Sınıf gereklidir" }]}
                >
                  <Select>
                    {gradeOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="term"
                  label="Dönem"
                  rules={[{ required: true, message: "Dönem gereklidir" }]}
                >
                  <Select>
                    {termOptions.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Kaydet
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <div className="announcements">
            <h2>Duyurular</h2>
            <Form form={form} onFinish={handleCreateAnnouncement}>
              <Form.Item
                name="title"
                label="Başlık"
                rules={[{ required: true, message: "Başlık gereklidir" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="content"
                label="İçerik"
                rules={[{ required: true, message: "İçerik gereklidir" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Oluştur
                </Button>
              </Form.Item>
            </Form>
            <Table
              dataSource={announcements}
              columns={columns}
              pagination={{
                pageSize: 5,
              }}
            />
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default TeacherPage;
