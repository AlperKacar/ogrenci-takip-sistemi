import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound, Home } from "./routerComponents";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import RequireAuth from "../Shared/auth/RequireAuth";
import LayoutPrivate from "../Shared/layout/LayoutPrivate";

const RouterPrivate = () => {
  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route
          element={
            <RequireAuth>
              <LayoutPrivate />
            </RequireAuth>
          }
        >
          <Route path="öğrenci/" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterPrivate;
