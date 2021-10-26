import React, { useEffect } from "react";
import { number } from "prop-types";

import * as Icon from "component/Icon";

import classes from "./Spinner.module.less";

const Spinner = ({ size = 32 }) => {
  useEffect(() => {
    if ("activeElement" in document) {
      const activeElement = document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }, []);

  return (
    <div className={classes.wrapper} style={{ "--spinner-size": `${size}px` }}>
      <div className={classes.spinner}>
        <Icon.System.Loading />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  size: number,
};

export default Spinner;
