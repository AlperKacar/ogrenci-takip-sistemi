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
        src="https://obs.dpu.edu.tr/oibs/gen_imgs/uni_logo.gif"
        alt="University Logo"
        className="logo"
      />
      <Title level={2} className="title">
        Kütahya Dumlupınar Üniversitesi
      </Title>
      <div className="role-buttons">
        <Link to="/oibs/ogrenci/login">
          <Button
            type={selectedRole === "student" ? "primary" : "default"}
            onClick={() => handleRoleSelection("student")}
            size="large"
          >
            Öğrenci Girişi
          </Button>
        </Link>
        <Link to="/oibs/akademik/login">
          <Button
            type={selectedRole === "teacher" ? "primary" : "default"}
            onClick={() => handleRoleSelection("teacher")}
            size="large"
          >
            Öğretmen Girişi
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
