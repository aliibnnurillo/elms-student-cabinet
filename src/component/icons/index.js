import React from "react";
import UploadIcon from "./Upload";
import UserIcon from "./UserIcon";
import Arrow from "./Arrow";
import PercentsIcon from "./percent";

export const Checked = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
        fill="#22C864"
      />
      <path
        d="M8.99987 11.586L13.5959 6.9895L14.3034 7.6965L8.99987 13L5.81787 9.818L6.52487 9.111L8.99987 11.586Z"
        fill="white"
      />
    </svg>
  );
};

export const Canceled = (props) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
        fill="#E43131"
      />
      <path
        d="M9.99987 9.29312L12.4749 6.81812L13.1819 7.52512L10.7069 10.0001L13.1819 12.4751L12.4749 13.1821L9.99987 10.7071L7.52487 13.1821L6.81787 12.4751L9.29287 10.0001L6.81787 7.52512L7.52487 6.81812L9.99987 9.29312Z"
        fill="white"
      />
    </svg>
  );
};
export { UploadIcon, UserIcon, Arrow, PercentsIcon };
