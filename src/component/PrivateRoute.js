import React from "react";
import { Route, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

const PrivateRoute = ({ path, component: Component, authStore: { auth } }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/user/login" />
      }
    />
  );
};

export default inject("authStore")(observer(PrivateRoute));
