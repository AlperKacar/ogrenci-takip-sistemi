import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound, Home } from "./routerComponents";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import LayoutGeneral from "../Shared/layout/LayoutGeneral";
const RouterGeneral = () => {
  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route path="/" element={<LayoutGeneral />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterGeneral;
