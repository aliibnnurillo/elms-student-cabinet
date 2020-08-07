import { NewsPage, OneNews } from "./pages/news";
import HomePage from "./pages/home/home";
import { Examination } from "./pages/examn";
import Ranting from "./pages/ranting/ranting";
import Messages from "./pages/message";
import Curriculum from "./pages/curriculum";
import { Subjects, SubjectList, Lesson } from "./pages/subjects";
import {
  Login,
  ForgotPassword,
  CreatePassword,
  EnterNewPassword,
} from "./pages/auth";

export const publicRoutes = [
  {
    path: "/user/login",
    component: Login,
  },
  { path: "/user/forgot-password", component: ForgotPassword },
  { path: "/user/reset-password", component: CreatePassword },
  { path: "/user/enter-new-password", component: EnterNewPassword },
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
    path: "/posts",
    component: NewsPage,
  },
  {
    path: "/posts/:id",
    component: OneNews,
  },
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/message",
    component: Messages,
  },
];
