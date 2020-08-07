import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = ({ history }) => (
  <div className="empty-page h-100vh d-flex-c">
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </div>
);

export default Unauthorized;
