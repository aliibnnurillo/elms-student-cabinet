import React from "react";
import { LeftMenu } from "../header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import APINotification from "../APINotification";
import { privateRoutes, publicRoutes, errorRoutes } from "../../routes";
import PrivateRoute from "../PrivateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <LeftMenu />
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
          {privateRoutes.map((route, idx) => (
            <PrivateRoute key={idx} {...route} exact />
          ))}
          {errorRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
        </Switch>
      </Router>
      <APINotification />
    </div>
  );
};

export default App;
