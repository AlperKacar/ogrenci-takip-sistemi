import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/userInformation";

const LoginStudent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    axios
      .post("/api/login", values)
      .then((response) => {
        console.log(response.data);
        // Giriş başarılı olduğunda yönlendirme yapabilirsiniz.
        dispatch(setLogin(response));
      })
      .catch((error) => {
        console.log(error);
        // Giriş başarısız olduğunda hata mesajını görüntüleyebilirsiniz.
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
    </div>
  );
};

export default LoginStudent;
