import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "../../store/userInformation";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const LoginTeacher = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [showReturnText, setShowReturnText] = useState(false);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [enteredNumber, setEnteredNumber] = useState("");
  const navigate = useNavigate();

  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  const handleNumberChange = (e) => {
    const value = e.target.value;
    setEnteredNumber(value);
  };
  const toggleReturnText = (show) => {
    setShowReturnText(show);
  };
  const handleLogin = (values) => {
    axios
      .post("http://localhost:3001/auth/teacher/Login", values)
      .then((response) => {
        if (response.status === 200) {
          const { token, user, message } = response.data;
          dispatch(setLogin(token));
          dispatch(setUser(user));
          toast.success(message);
          navigate("/oibs/start/teacher", {
            replace: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle login error
      });
  };

  return (
    <>
      <Helmet>
        <title>Öğretmen Giriş</title>
      </Helmet>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(https://e-okul.meb.gov.tr/theme/able/assets/images/bg.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Link
          to="/"
          onMouseEnter={() => toggleReturnText(true)}
          onMouseLeave={() => toggleReturnText(false)}
        >
          <div style={{ position: "relative" }}>
            <img
              src="https://e-okul.meb.gov.tr/theme/able/assets/images/eokullogo.png"
              alt="Meb Logo"
              style={{ width: "300px", marginBottom: "20px" }}
            />
            {showReturnText && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "5px",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                Ana Sayfaya Dön
              </span>
            )}
          </div>
        </Link>
        <h2 style={{ color: "white" }}>Öğretmen Giriş Sayfası</h2>
        <Form
          form={form}
          onFinish={handleLogin}
          style={{
            width: "400px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {" "}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            {randomNumber}
          </div>
          <Form.Item
            label="Sayıyı Girin"
            name="number"
            rules={[
              {
                required: true,
                message: "Lütfen sayıyı girin",
              },
            ]}
            labelAlign="left"
          >
            <Input
              onChange={handleNumberChange}
              value={enteredNumber}
              placeholder="Üstte yazan sayıyı giriniz"
            />
          </Form.Item>
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              {
                required: true,
                message: "Kullanıcı adınızı giriniz",
              },
            ]}
            labelAlign="left"
            colon={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              {
                required: true,
                message: "Şifrenizi giriniz",
              },
            ]}
            labelAlign="left"
            colon={false}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 9 }}>
            <Button type="primary" htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <p style={{ marginTop: "10px", color: "#fff", textAlign: "center" }}>
          Hesabınız yoksa{" "}
          <Link
            to="/oibs/teacher/signup"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Kayıt olabilirsiniz
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default LoginTeacher;
