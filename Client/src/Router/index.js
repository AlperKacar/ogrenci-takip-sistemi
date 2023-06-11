import React, { useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import LayoutMembership from "../Shared/layout/LayoutMembership";
import {
  RouterMembership,
  PageNotFound,
  RouterPrivate,
} from "./routerComponents";
import RouterGeneral from "./routerGeneral";

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

        {/* user login... */}
        <Route path="/oibs/*" element={<RouterMembership />} />
        {/* login sonrası private */}
        <Route path="/oibs/start/*" element={<RouterPrivate />} />
        <Route path="/*" element={<RouterGeneral />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
