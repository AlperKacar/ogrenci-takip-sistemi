import React from "react";
import { MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "./sidemenu.css"

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label
  };
}

const items = [
  getItem("Devamsızlık Bilgisi", 1,),
  getItem("Sınav Notları", 2,),
  getItem("Duyurular", 3,)
];

const StudentProfileSideMenuCopy = (props) => {
  const onClick = (e) => {
    props.setSelected(e.key.toString())
    
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["2"]}
      mode="inline"
      items={items}
      className="custom-menu"
    />
  );
};

export default StudentProfileSideMenuCopy;