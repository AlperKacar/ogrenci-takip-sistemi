import React, { useState } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const userData = {
      fullName,
      username,
      password,
    };

    axios
      .post("/api/signup", userData)
      .then((response) => {
        console.log(response.data);
        // Registration successful
      })
      .catch((error) => {
        console.log(error);
        // Error occurred during registration
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
      <h2>Kayıt Sayfası</h2>
      <Input
        placeholder="Ad Soyad"
        value={fullName}
        onChange={handleFullNameChange}
        style={{ marginBottom: "10px", width: "200px" }}
      />
      <Input
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={handleUsernameChange}
        style={{ marginBottom: "10px", width: "200px" }}
      />
      <Input.Password
        placeholder="Şifre"
        value={password}
        onChange={handlePasswordChange}
        style={{ marginBottom: "10px", width: "200px" }}
      />
      <Input.Password
        placeholder="Şifre Tekrar"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        style={{ marginBottom: "10px", width: "200px" }}
      />
      {passwordError && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          Şifreler eşleşmiyor.
        </p>
      )}
      <Button type="primary" onClick={handleSignup}>
        Kayıt Ol
      </Button>
      <p style={{ marginTop: "10px" }}>
        Hesabınız var mı? <Link to="/login">Giriş yapabilirsiniz</Link>.
      </p>
    </div>
  );
};

export default SignupPage;
