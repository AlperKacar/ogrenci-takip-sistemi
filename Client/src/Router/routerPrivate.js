import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  PageNotFound,
  StudentProfile,
  TeacherProfile,
  TeacherProfileNote,
  TeacherProfileEdit,
  TeacherProfileAttendance,
} from "./routerComponents";
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
          <Route path="student" element={<StudentProfile />} />
          <Route path="teacher" element={<TeacherProfile />} />
          <Route
            path="teacher/yoklama"
            element={<TeacherProfileAttendance />}
          />
          <Route path="teacher/notlar" element={<TeacherProfileNote />} />
          <Route path="teacher/duzenleme" element={<TeacherProfileEdit />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterPrivate;
