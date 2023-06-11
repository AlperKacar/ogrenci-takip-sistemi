import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./HeaderAuth.css";
export default function AuthHeader() {
  return (
    <div className="header">
      <img
        src="https://obs.dpu.edu.tr/oibs/gen_imgs/uni_logo.gif"
        alt="University Logo"
        className="logo"
      />
      <h1 className="university-name">Kütahya Dumlupınar Üniversitesi</h1>
      <Link to="/">
        <Button type="primary">Ana Sayfa</Button>
      </Link>
    </div>
  );
}
