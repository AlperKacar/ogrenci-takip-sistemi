import { Outlet } from "react-router-dom";
import HeaderAuth from "../../Components/HeaderAuth";
export default function LayoutPrivateTeacher() {
  return (
    <>
     <HeaderAuth/>
      <Outlet />
    </>
  );
}
