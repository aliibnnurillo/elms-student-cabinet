import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ServerErrorPage = () => (
  <div className="empty-page h-100vh d-flex-c">
    <Result
      status="500"
      title="500"
      subTitle="Sorry, Internal server error occured!"
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  </div>
);

export default ServerErrorPage;
