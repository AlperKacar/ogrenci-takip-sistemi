import { lazy } from "react";

//private
const RouterPrivate = lazy(() => import("./routerPrivate"));
const Home = lazy(() => import("../Pages/Home/Home"));

//membership
const RouterMembership = lazy(() => import("./routerMembership"));
const LoginStudent = lazy(() => import("../Pages/membership/Login-student"));
const LoginTeacher = lazy(() => import("../Pages/membership/Login-teacher"));
const SignUpTeacher = lazy(() => import("../Pages/membership/Signup-teacher"));

//notFound
const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

export {
  //membership
  LoginStudent,
  LoginTeacher,
  RouterMembership,
  SignUpTeacher,

  //private
  RouterPrivate,
  Home,

  //notFound
  PageNotFound,
};
