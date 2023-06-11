import { lazy } from "react";

//private
const RouterPrivate = lazy(() => import("./routerPrivate"));
const Home = lazy(() => import("../Pages/Home/Home"));

//membership
const RouterMembership = lazy(() => import("./routerMembership"));
const LoginStudent = lazy(() => import("../Pages/membership/Login-student"));
const LoginTeacher = lazy(() => import("../Pages/membership/Login-teacher"));
const SignUpTeacher = lazy(() => import("../Pages/membership/Signup-teacher"));

//TeacherProfile
const TeacherProfile = lazy(() =>
  import("../Pages/TeacherProfile/TeacherProfile")
);
const TeacherProfileAttendance = lazy(() =>
  import("../Pages/TeacherProfile/TeacherProfileAttendance")
);
const TeacherProfileEdit = lazy(() =>
  import("../Pages/TeacherProfile/TeacherProfileEdit")
);
const TeacherProfileNote = lazy(() =>
  import("../Pages/TeacherProfile/TeacherProfileNote")
);

//StudentProfile
const StudentProfile = lazy(() =>
  import("../Pages/StudentProfile/StudentProfile")
);

//notFound
const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

export {
  //membership
  LoginStudent,
  LoginTeacher,
  RouterMembership,
  SignUpTeacher,

  //TeacherProfile
  TeacherProfile,
  TeacherProfileNote,
  TeacherProfileEdit,
  TeacherProfileAttendance,

  //StudentProfile
  StudentProfile,

  //private
  RouterPrivate,
  Home,

  //notFound
  PageNotFound,
};
