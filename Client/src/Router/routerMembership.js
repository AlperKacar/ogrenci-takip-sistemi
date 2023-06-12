import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  LoginStudent,
  LoginTeacher,
  PageNotFound,
  SignUpTeacher,
  Home,
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
          path="/"
          element={
            <MembershipAuth>
              <LayoutMembership />
            </MembershipAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="oibs/student/login" element={<LoginStudent />} />
          <Route path="oibs/teacher/login" element={<LoginTeacher />} />
          <Route path="oibs/teacher/signup" element={<SignUpTeacher />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(RouterMembership);
