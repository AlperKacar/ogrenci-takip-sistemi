import { memo } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const MembershipAuth = memo(({ children }) => {
  const isLoggedIn = useSelector((state) => state.userInformation.isLogged);
  const user = useSelector((state) => state.userInformation.user);
  let location = useLocation();

  if (isLoggedIn && user === "Ogretmen") {
    return (
      <Navigate
        to="/oibs/start/teacher"
        replace={true}
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }
  if (isLoggedIn && user === "Öğrenci") {
    return (
      <Navigate
        to="/oibs/start/student"
        replace={true}
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }
  return children;
});

export default MembershipAuth;
