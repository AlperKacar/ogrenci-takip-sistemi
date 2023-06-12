import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const SignupPage = () => {
  const navigate = useNavigate();
  const [showReturnText, setShowReturnText] = useState(false);
  const toggleReturnText = (show) => {
    setShowReturnText(show);
  };

  const handleSignup = (values) => {
    axios
      .post("http://localhost:3001/auth/teacher/Signup", values)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/oibs/teacher/login", {
          replace: true,
        });
      })
      .catch((error) => {
        toast(error);

        // Error occurred during registration
      });
  };

  return (
    <>
      <Helmet>
        <title>Öğretmen Kayıt</title>
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
        <h2 style={{ color: "#fff" }}>Kayıt Sayfası</h2>
        <Form
          onFinish={handleSignup}
          style={{
            width: "500px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
            backgroundColor: "#fff",
          }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Ad Soyad"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Lütfen ad soyadınızı giriniz",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              {
                required: true,
                message: "Lütfen kullanıcı adınızı giriniz",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="TC Kimlik Numarası"
            name="tcKimlikNo"
            rules={[
              {
                required: true,
                message: "Lütfen TC kimlik numaranızı giriniz",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon Numarası"
            name="telefonNo"
            rules={[
              {
                required: true,
                message: "Lütfen telefon numaranızı giriniz",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name="password"
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi giriniz",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Şifre Tekrar"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Lütfen şifrenizi tekrar giriniz",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Şifreler eşleşmiyor"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button type="primary" htmlType="submit">
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <p style={{ marginTop: "10px", color: "#fff" }}>
          Hesabınız var mı?{" "}
          <Link
            to="/oibs/teacher/login"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Giriş yapabilirsiniz
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default SignupPage;
