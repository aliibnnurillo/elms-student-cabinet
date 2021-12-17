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
import NotPermitted from "./pages/402";
import ServerErrorPage from "./pages/500";
import VerifyCode from "./pages/auth/VerifyCode";
import MessagePage from "./pages/message";
import ProfilePage from "./pages/profile";
import ExamSchedule from "./pages/subjects/ExamSchedule";
import TakeMidtermExam from "./pages/subjects/TakeMidtermExam";

import Controls from "./pages/controls";
export const publicRoutes = [
  {
    path: "/",
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
    exact: true,
  },
  {
    path: "/exam",
    component: Examination,
    exact: true,
  },
  {
    path: "/:semesterId/subjects/:subjectId/:id",
    component: Lesson,
    exact: true,
  },
  {
    path: "/:semesterId/subjects/:id/exam-schedules/:type",
    component: ExamSchedule,
    exact: true,
  },
  {
    path: "/:semesterId/subjects/:id/exam-schedules/:type/:examId",
    component: TakeMidtermExam,
    exact: true,
  },
  {
    path: "/:semesterId/subjects/:id",
    component: SubjectList,
    exact: true,
  },
  {
    path: "/rating",
    component: Ranting,
    exact: true,
  },
  {
    path: "/curriculum",
    component: Curriculum,
    exact: true,
  },
  {
    path: "/posts",
    component: NewsPage,
    exact: true,
  },
  {
    path: "/posts/:id",
    component: OneNews,
    exact: true,
  },
  {
    path: "/messages",
    component: MessagePage,
  },
  {
    path: "/profile",
    component: ProfilePage,
    exact: true,
  },
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/controls",
    component: Controls,
    exact: true,
  },
];

export const errorRoutes = [
  { path: "/402", component: NotPermitted },

  {
    path: "/403",
    component: Unauthorized,
  },
  { path: "/500", component: ServerErrorPage },
  { path: "/*", component: NoFoundPage },
];
