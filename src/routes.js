import { NewsPage, OneNews } from "./pages/news";
import HomePage from "./pages/home/home";
import { Examination } from "./pages/examn";
import Ranting from "./pages/ranting/ranting";
import Curriculum from "./pages/curriculum";
import { Subjects, SubjectList, Lesson } from "./pages/subjects";
import {
  Login,
  ForgotPassword,
  CreatePassword,
  EnterNewPassword,
  EnterNewEmails,
} from "./pages/auth";
import NoFoundPage from "./pages/404";
import Unauthorized from "./pages/403";
import ServerErrorPage from "./pages/500";

export const publicRoutes = [
  {
    path: "/user/login",
    component: Login,
  },
  { path: "/user/forgot-password", component: ForgotPassword },
  { path: "/user/reset-password", component: CreatePassword },
  { path: "/user/new-email", component: EnterNewEmails },
  { path: "/user/new-password", component: EnterNewPassword },
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
    path: "/subjects/lesson/:id",
    component: Lesson,
  },
  {
    path: "/subjects/:id",
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
];

export const errorRoutes = [
  {
  path: "/403",
    component: Unauthorized,
  },
  { path: "/500", component: ServerErrorPage },
  { path: "/*", component: NoFoundPage },
];