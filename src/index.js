import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import "antd/dist/antd.css";

import stores from "stores";
import "./i18n";

import Splash from "component/Splash";

import App from "app";

const app = (
  <Provider {...stores}>
    <Suspense fallback={<Splash />}>
      <App />
    </Suspense>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
