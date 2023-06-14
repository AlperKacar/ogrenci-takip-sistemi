import React, { useState, useEffect } from "react";
import { Table, Button, Modal, InputNumber, Select, Radio, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenuPage from "../../Components/MenuPage";

const { Option } = Select;
export default function StudentGradesPage() {
  const token = useSelector((state) => state.userInformation.token);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newGrade, setNewGrade] = useState(0);
  const [selectedExam, setSelectedExam] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseTableVisible, setCourseTableVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attended, setAttended] = useState(true);

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
      setLoading(true);
      setStudents(response.data.Ogrenciler);
    } catch (error) {
      console.error("Öğrenciler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);
  const handleEditGrade = (student, course) => {
    setModalVisible(true);
    setSelectedStudent(student);
    setSelectedCourse(course);
  };
  const saveGrade = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/ogretmen/ogrenci_notu_gir/${selectedStudent._id}`,
        {
          selectedCourse,
          selectedExam, // Hangi sınav olduğu gönderiliyor
          newGrade, // Sınav notu gönderiliyor
          attended, // Sınava girildi durumu gönderiliyor
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setModalVisible(false);
        fetchStudents();
        setCourseTableVisible(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  const handleViewCourses = (student) => {
    setSelectedStudent(student);
    setCourseTableVisible(true);

    // Ekranı en alta kaydır
    const tableContainer = document.getElementById("course-table-container");
    if (tableContainer) {
      tableContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const courses = [
    {
      courseName: "matematik",
      exams: [
        { examName: "Sınav 1", key: "matematik1" },
        { examName: "Sınav 2", key: "matematik2" },
        { examName: "Sınav 3", key: "matematik3" },
      ],
    },
    {
      courseName: "hayatBilgisi",
      exams: [
        { examName: "Sınav 1", key: "hayatBilgisi1" },
        { examName: "Sınav 2", key: "hayatBilgisi2" },
        { examName: "Sınav 3", key: "hayatBilgisi3" },
      ],
    },
    {
      courseName: "fenBilgisi",
      exams: [
        { examName: "Sınav 1", key: "fenBilgisi1" },
        { examName: "Sınav 2", key: "fenBilgisi2" },
        { examName: "Sınav 3", key: "fenBilgisi3" },
      ],
    },
  ];

  const courseColumns = [
    {
      title: "Ders Adı",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Sınav 1",
      dataIndex: "exam1",
      key: "exam1",
    },
    {
      title: "Sınav 2",
      dataIndex: "exam2",
      key: "exam2",
    },
    {
      title: "Sınav 3",
      dataIndex: "exam3",
      key: "exam3",
    },
    {
      title: "Notu Düzenle",
      dataIndex: "editGrade",
      key: "editGrade",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() =>
            handleEditGrade(selectedStudent, record.courseName, record.key)
          }
        >
          Notu Düzenle
        </Button>
      ),
    },
  ];

  const courseData = courses.map((course) => {
    const courseItem = {
      courseName: course.courseName,
      editGrade: "",
    };

    const exam1Value = selectedStudent
      ? selectedStudent[`${course.courseName}1`]
      : "";
    const exam2Value = selectedStudent
      ? selectedStudent[`${course.courseName}2`]
      : "";
    const exam3Value = selectedStudent
      ? selectedStudent[`${course.courseName}3`]
      : "";

    courseItem.exam1 = exam1Value;
    courseItem.exam2 = exam2Value;
    courseItem.exam3 = exam3Value;

    return courseItem;
  });
  const studentColumns = [
    {
      title: "İsim",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Öğrenci Numarası",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "Dersleri Görüntüle",
      dataIndex: "viewCourses",
      key: "viewCourses",
      render: (text, student) => (
        <Button type="primary" onClick={() => handleViewCourses(student)}>
          Dersleri Görüntüle
        </Button>
      ),
    },
  ];
  if (!loading) {
    return <div>Yükleniyor</div>;
  }
  return (
    <div className="student-grades-page">
      <MenuPage />
      <div className="table-colum">
        <div className="search-bar">
          <Input
            type="text"
            placeholder="Öğrenci ara"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table
          dataSource={students}
          columns={studentColumns}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }}
        />
        {courseTableVisible && (
          <div id="course-table-container">
            <Table dataSource={courseData} columns={courseColumns} />
          </div>
        )}
      </div>

      {/* Not düzenleme modalı */}
      <Modal
        title="Notu Düzenle"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={saveGrade}
      >
        <p>{selectedExam && `${selectedCourse}`}</p>
        <Select
          defaultValue="Sınav Seçin"
          onChange={(value) => setSelectedExam(value)}
        >
          {courses[0].exams.map((exam, index) => (
            <Option key={index} value={exam.key}>
              {exam.examName}
            </Option>
          ))}
        </Select>
        {attended && (
          <InputNumber
            placeholder="Notu girin"
            value={newGrade}
            onChange={(value) => setNewGrade(value)}
          />
        )}

        <Radio.Group
          onChange={(e) => setAttended(e.target.value)}
          value={attended}
        >
          <Radio value={true}>Girdi</Radio>
          <Radio value={false}>Girmedi</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
}
