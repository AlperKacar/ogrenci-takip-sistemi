import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { setLogout } from "../store/userInformation";
import "./HeaderAuth.css";
import logo from "../images/dpu-logo4.png"
import axios from "axios"
export default function HeaderAuth(props) {
  const [name,setName]=useState("")
  const tur=props.tur
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { token } = useSelector((state) => state.userInformation);
  useEffect(() => {
    const image = new Image();
    image.src = logo;
    image.onload = () => setIsImageLoaded(true);
    fetchUserProfile();
   
  }, []);
  const fetchUserProfile = async () => {
    
    try {
      const response = await axios.get(
        "http://localhost:3001/auth/ogrenciAdiGonder",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setName(response.data)
      
    } catch (error) {}
  };
  
  const renderElement = (tur) => {
    if (tur === 'Ogrenci') {
      return <h1 className="university-name">Öğrenci Bilgi Sistemi</h1>;
    } else if (tur === 'Ogretmen') {
      return  <h1 className="university-name">Öğretmen Yönetim Sistemi</h1>
    } 
  };
  const logoutHandle = () => {
    dispatch(setLogout());
    navigate(location.state?.return_url || "/", {
      replace: true,
    });
  };
  return (
    <div className="main-div">
    <div className="header">
           {isImageLoaded ? (
        <img src={logo} className="logo" alt="Logo" />
      ) : (
        <div style={{ width: '200px', height: '50px' }}></div>
      )}
     
        {renderElement(tur)}
        <span className="ogr-ad">Adı:{name}</span>
      <Link to="/" onClick={logoutHandle}>
        <Button className="cikis-button" danger type="primary">Çıkış Yap</Button>
      </Link>
    </div></div>
  );
}
