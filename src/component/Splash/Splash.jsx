import React, { useEffect } from "react";

import * as Icon from "component/Icon";
import Spinner from "component/Spinner";

import classes from "./Splash.module.less";

const Splash = () => {
  useEffect(() => {
    if ("activeElement" in document) {
      document.activeElement.blur();
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.logo}>
        <Icon.Logo.Hozirontal />
      </div>
      <div className={classes.loading}>
        <div className={classes.loadingSpinner}>
          <Spinner size={32} />
        </div>
      </div>
    </div>
  );
};

export default Splash;
