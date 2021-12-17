import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const NotPermitted = ({ history }) => (
  <div className={"content home-page"}>
    <div className="empty-page h-100vh d-flex-c">
      <Result
        status="403"
        title="402"
        subTitle="Sorry you are not allowed to enter this page, please contact with you department"
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  </div>
);

export default NotPermitted;
