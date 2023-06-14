import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderAuth from "../../Components/HeaderAuth";

function StudentResetPassword() {
  const token = useSelector((state) => state.userInformation.token);
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/ogrenci/reset-password",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Şifre sıfırlama işlemi başarılı olduğunda yapılması gereken işlemleri buraya ekleyebilirsiniz
      window.location.reload();
      navigate("/oibs/start/student", {
        replace: true,
      });
    } catch (error) {
      setError("Şifre sıfırlama işlemi başarısız oldu.");
    }
  };

  return (
    <div className="container">
      <HeaderAuth />
      <div className="main-body">
        <form className="reset-password-form" onSubmit={handleResetPassword}>
          <h2>Şifre Yenileme</h2>
          <div className="form-group">
            <label htmlFor="new-password">Yeni Şifre</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Yeni Şifre Onayı</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Şifreyi Yenile</button>
        </form>
      </div>
    </div>
  );
}

export default StudentResetPassword;
