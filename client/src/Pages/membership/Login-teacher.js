import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/userInformation";

const LoginTeacher = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    axios
      .post("/api/login", values)
      .then((response) => {
        console.log(response.data);
        // Handle successful login
        dispatch(setLogin(response));
      })
      .catch((error) => {
        console.log(error);
        // Handle login error
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h2>Login Sayfası</h2>
      <Form form={form} onFinish={handleLogin} style={{ width: "300px" }}>
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[
            {
              required: true,
              message: "Kullanıcı adınızı giriniz",
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
              message: "Şifrenizi giriniz",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <p style={{ marginTop: "10px" }}>
        Hesabınız yoksa{" "}
        <Link to="/oibs/akademik/signup">kayıt olabilirsiniz</Link>.
      </p>
    </div>
  );
};

export default LoginTeacher;
