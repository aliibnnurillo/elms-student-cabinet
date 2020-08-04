import { NewsPage, OneNews } from "./pages/news";
import HomePage from "./pages/home/home";
import { Examination } from "./pages/examn";
import Ranting from "./pages/ranting/ranting";
import Curriculum from "./pages/curriculum";
import { Subjects, SubjectList, Lesson } from "./pages/subjects";
import { Login, ForgotPassword, CreatePassword } from "./pages/auth";

export const publicRoutes = [
  {
    path: "/user/login",
    component: Login,
  },
  { path: "/user/forgot-password", component: ForgotPassword },
  { path: "/user/reset-password", component: CreatePassword },
];

export const privateRoutes = [
  {
    path: "/subjects",
    component: Subjects,
  },
  {
    path: "/exam",
    component: Examination,
  },
  {
    path: "/subjects/:subject/:lesson",
    component: Lesson,
  },
  {
    path: "/subjects/:subject",
    component: SubjectList,
  },
  {
    path: "/rating",
    component: Ranting,
  },
  {
    path: "/curriculum",
    component: Curriculum,
  },
  {
    path: "/news",
    component: NewsPage,
  },
  {
    path: "/news/:id",
    component: OneNews,
  },
  {
    path: "/",
    component: HomePage,
  },
];
