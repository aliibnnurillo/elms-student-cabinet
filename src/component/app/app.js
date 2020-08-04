import React from "react";
import { LeftMenue } from "../header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Subjects, SubjectList, Lesson } from "../../pages/subjects";
import "./app.css";

import { NewsPage, OneNews } from "../../pages/news";
import HomePage from "../../pages/home/home";
import { Examination } from "../../pages/examn";
import Ranting from "../../pages/ranting/ranting";
import Curiculum from "../../pages/curriculum";

const App = () => {
  return (
    <div>
      <Router>
        <LeftMenue />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/exam" exact component={Examination} />
          <Route path="/subjects" exact component={Subjects} />
          <Route path="/subjects/thissubject" exact component={SubjectList} />
          <Route path="/subjects/thissubject/lesson" component={Lesson} />
          <Route path="/ranting" exact component={Ranting} />
          <Route path="/curicul" exact component={Curiculum} />

          <Route path="/news" exact component={NewsPage} />
          <Route path="/news/one-news/:id" exact component={OneNews} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
