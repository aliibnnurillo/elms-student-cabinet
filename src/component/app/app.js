import React from "react";
import { Header, LeftMenue, Content } from "../header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Subjects, SubjectList, Lesson } from "../../pages/subjects";
import "./app.css";
import {
  Auth,
  EnterNewEmails,
  EnterNewPassword,
  UploadAvatar,
  ForgotPassword,
  CreatePassword,
} from "../../pages/auth";

const App = () => {
  return (
    <div>
      <Router>
        <LeftMenue />
        <Header />
        <div className="content">
          <Switch>
            <Route path="/subjects" exact component={Subjects} />
            <Route path="/subjects/thissubject" exact component={SubjectList} />
            <Route path="/subjects/thissubject/lesson" component={Lesson} />
          </Switch>
        </div>
        {/* <Auth />

        {/* <EnterNewPassword /> */}
        {/* <EnterNewEmails /> */}
        {/* <UploadAvatar /> */}
        {/* <ForgotPassword /> */}
        {/* <CreatePassword /> */}
      </Router>
    </div>
  );
};

export default App;
