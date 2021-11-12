import React, { useEffect } from "react";
import { number } from "prop-types";

import * as Icon from "component/Icon";

import "./Spinner.css";

const Spinner = ({ size = 32 }) => {
  useEffect(() => {
    if ("activeElement" in document) {
      const activeElement = document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
    }
  }, []);

  return (
    <div className={"spinnerWrapper"} style={{ "--spinner-size": `${size}px` }}>
      <div className={"spinner"}>
        <Icon.System.Loading />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  size: number,
};

export default Spinner;
