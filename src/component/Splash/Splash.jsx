import React, { useEffect } from "react";

import * as Icon from "component/Icon";
import Spinner from "component/Spinner";

import "./Splash.css";

const Splash = () => {
  useEffect(() => {
    if ("activeElement" in document) {
      document.activeElement.blur();
    }
  }, []);

  return (
    <div className={"splashWrapper"}>
      <div className={"splashLogo"}>
        <Icon.Logo.Hozirontal />
      </div>
      <div className={"splashLoading"}>
        <div className={"splashLoadingSpinner"}>
          <Spinner size={32} />
        </div>
      </div>
    </div>
  );
};

export default Splash;
