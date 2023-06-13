import React from 'react'
import { Link } from 'react-router-dom'
import "./sidemenu.css"
function StudentProfileSideMenu() {
  return (
    <div className="menu-container">
    <h1 className="menu-title">Menü</h1>
    <ul className="menu-list">
      <li className="menu-item">
        <Link to="/oibs/start/teacher/yoklama">Devamsızlık Bilgisi</Link>
      </li>
      <li className="menu-item">
        <Link to="/oibs/start/teacher/notlar">Sınav Notları</Link>
      </li>
      <li className="menu-item">
        <Link to="/oibs/start/teacher/duzenleme">Duyurular</Link>
      </li>
    </ul>
  </div>
  )
}

export default StudentProfileSideMenu