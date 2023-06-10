import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  LoginStudent,
  LoginTeacher,
  PageNotFound,
  SignUpTeacher,
} from "./routerComponents";
import LayoutMembership from "../Shared/layout/LayoutMembership";
import MembershipAuth from "../Shared/auth/MembershipAuth";
import LoadingTruck from "../Shared/commonComponents/loading/LoadingTruck";
import { memo } from "react";

const RouterMembership = () => {
  return (
    <Suspense fallback={<LoadingTruck />}>
      <Routes>
        <Route
          element={
            <MembershipAuth>
              <LayoutMembership />
            </MembershipAuth>
          }
        >
          <Route path="ogrenci/login" element={<LoginStudent />} />
          <Route path="akademik/login" element={<LoginTeacher />} />
          <Route path="akademik/signup" element={<SignUpTeacher />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(RouterMembership);
