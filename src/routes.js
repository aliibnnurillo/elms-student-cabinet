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
  EnterNewEmails,
  UploadAvatar,
} from "./pages/auth";
import NoFoundPage from "./pages/404";
import Unauthorized from "./pages/403";
import ServerErrorPage from "./pages/500";
import VerifyCode from "./pages/auth/VerifyCode";
import MessagePage from "./pages/message";
import ProfilePage from "./pages/profile";

export const publicRoutes = [
  {
    path: "/user/login",
    component: Login,
  },
  { path: "/user/forgot-password", component: ForgotPassword },
  { path: "/user/reset-password", component: CreatePassword },
  { path: "/user/new-email", component: EnterNewEmails },
  { path: "/user/new-password", component: EnterNewPassword },
  { path: "/user/new-avatar", component: UploadAvatar },
  { path: "/user/verify-code", component: VerifyCode },
];

export const privateRoutes = [
  {
    path: "/:semesterId/subjects",
    component: Subjects,
  },
  {
    path: "/exam",
    component: Examination,
  },
  {
    path: "/:semesterId/subjects/:subjectId/:id",
    component: Lesson,
  },
  {
    path: "/:semesterId/subjects/:id",
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
    path: "/messages",
    component: MessagePage,
  },
  {
    path: "/profile",
    component: ProfilePage,
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

export const errorRoutes = [
  {
    path: "/403",
    component: Unauthorized,
  },
  { path: "/500", component: ServerErrorPage },
  { path: "/*", component: NoFoundPage },
];
