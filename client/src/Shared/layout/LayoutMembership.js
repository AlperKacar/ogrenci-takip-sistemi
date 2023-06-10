import { Outlet } from "react-router-dom";
import AuthHeader from "../../Components/HeaderAuth";

export default function LayoutMembership() {
  return (
    <div>
      <AuthHeader />
      <Outlet />
    </div>
  );
}
