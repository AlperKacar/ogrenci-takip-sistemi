import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound, StudentProfile } from "./routerComponents";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import RequireAuth from "../Shared/auth/RequireAuth";
import LayoutPrivateStudent from "../Shared/layout/LayoutPrivateStudent";

const RouterPrivate = () => {
  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route
          element={
            <RequireAuth>
              <LayoutPrivateStudent />
            </RequireAuth>
          }
        >
          <Route path="/" element={<StudentProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterPrivate;
