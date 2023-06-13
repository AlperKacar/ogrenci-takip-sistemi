import Router from "./Router/index";
import { useSelector } from "react-redux";
import LoadingTruck from "./Shared/commonComponents/loading/LoadingTruck";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isLoggedIn = useSelector((state) => state.userInformation.isLoggedIn);
  if (isLoggedIn) {
    setTimeout(() => {
      return <LoadingTruck />;
    }, 1000);
  }

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;
