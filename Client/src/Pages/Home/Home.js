import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import "./Home.css";

const { Title } = Typography;

const Home = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="home-container">
      <img
        src="https://e-okul.meb.gov.tr/theme/able/assets/images/eokullogo.png"
        alt="Meb Logo"
        className="logo"
      />
      <Title level={2} style={{ color: "white" }}>
        BİRİNCİ SINIF ÖĞRENCİ TAKİP SİSTEMİ
      </Title>
      <div className="role-buttons">
        <Link to="/oibs/teacher/login">
          <Button
            className="ant-btn-primary ant-btn-left"
            type={selectedRole === "student" ? "primary" : "default"}
            onClick={() => handleRoleSelection("student")}
            size="large"
          ></Button>
        </Link>
        <Link to="/oibs/student/login">
          <Button
            className="ant-btn-default ant-btn-right"
            type={selectedRole === "teacher" ? "primary" : "default"}
            onClick={() => handleRoleSelection("teacher")}
            size="large"
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
