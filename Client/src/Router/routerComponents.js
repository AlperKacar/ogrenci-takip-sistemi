import { lazy } from "react";

//membership
const RouterMembership = lazy(() => import("./routerMembership"));
const LoginStudent = lazy(() => import("../Pages/membership/Login-student"));
const LoginTeacher = lazy(() => import("../Pages/membership/Login-teacher"));
const SignUpTeacher = lazy(() => import("../Pages/membership/Signup-teacher"));
const Home = lazy(() => import("../Pages/Home/Home"));

//TeacherProfile
const RouterPrivateTeacher = lazy(() => import("./routerPrivateTeacher"));
const TeacherProfile = lazy(() =>
  import("../Pages/TeacherProfile/TeacherProfile")
);
const TeacherProfileAttendance = lazy(() =>
  import("../Pages/TeacherProfile/TeacherAttendancePage")
);
const TeacherProfileEdit = lazy(() =>
  import("../Pages/TeacherProfile/TeacherStudentsPage")
);
const TeacherProfileNote = lazy(() =>
  import("../Pages/TeacherProfile/StudentGradesPage")
);

//StudentProfile
const RouterPrivateStudent = lazy(() => import("./routerPrivateStudent"));

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
  Home,

  //TeacherProfile
  RouterPrivateTeacher,
  TeacherProfile,
  TeacherProfileNote,
  TeacherProfileEdit,
  TeacherProfileAttendance,

  //StudentProfile
  RouterPrivateStudent,
  StudentProfile,

  //notFound
  PageNotFound,
};
