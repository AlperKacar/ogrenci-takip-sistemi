import { memo, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const RequireAuthStudent = memo(({ children }) => {
  const token = useSelector((state) => state.userInformation.token);
  const [controller, setController] = useState(null);

  const fetchStudentsPasswordController = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/ogrenci/password_controller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setController(response.data.isVerifiedPassword);
    } catch (error) {
      console.log(error);
      setController(false); // Hata durumunda false olarak ayarla
    }
  };

  useEffect(() => {
    fetchStudentsPasswordController();
  }, []);

  const location = useLocation();

  if (controller === false) {
    return (
      <Navigate
        to={`/password/${token}`}
        replace={true}
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }

  return children;
});

export default RequireAuthStudent;
