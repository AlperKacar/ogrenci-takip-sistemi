import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PageNotFound, StudentResetPassword } from "./routerComponents";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import RequireAuthController from "../Shared/auth/RequireAuthController";
import LayoutPrivateStudent from "../Shared/layout/LayoutPrivateStudent";
import MembershipAuth from "../Shared/auth/MembershipAuth";

const RouterPrivate = () => {
  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route
          element={
            <RequireAuthController>
              <LayoutPrivateStudent />
            </RequireAuthController>
          }
        >
          <Route path="/:token" element={<StudentResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterPrivate;
