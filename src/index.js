import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./component/app/app";
import "antd/dist/antd.css";
import { Provider } from "mobx-react";
import stores from "./stores";

import "./i18n";

const app = (
  <Provider {...stores}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
