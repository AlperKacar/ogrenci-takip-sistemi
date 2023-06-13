import React from "react";
import { Link } from "react-router-dom";
import "./MenuPage.css";

const MenuPage = () => {
  return (
    <div className="menu-container">
      <h1 className="menu-title">Menü</h1>
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/oibs/start/teacher">Duyurularım</Link>
        </li>
        <li className="menu-item">
          <Link to="/oibs/start/teacher/yoklama">Öğrenci Yoklaması</Link>
        </li>
        <li className="menu-item">
          <Link to="/oibs/start/teacher/notlar">Öğrenci Notları</Link>
        </li>
        <li className="menu-item">
          <Link to="/oibs/start/teacher/duzenleme">Öğrenci Düzenleme</Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuPage;
