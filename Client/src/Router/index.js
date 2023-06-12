import React, { useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import LayoutMembership from "../Shared/layout/LayoutMembership";
import {
  RouterMembership,
  PageNotFound,
  RouterPrivateTeacher,
  RouterPrivateStudent,
} from "./routerComponents";

const Router = () => {
  const { pathname } = useLocation();

  useEffect(() => {}, []);

  useEffect(() => {}, [pathname]);

  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route
          path="/500"
          element={
            <LayoutMembership childrenActive>
              <PageNotFound
                title="Beklenmeyen hata"
                desc={<>500 Internal server error</>}
              />
            </LayoutMembership>
          }
        />
        <Route path="/*" element={<RouterMembership />} />
        <Route path="/oibs/start/teacher*" element={<RouterPrivateTeacher />} />
        <Route path="/oibs/start/student*" element={<RouterPrivateStudent />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
