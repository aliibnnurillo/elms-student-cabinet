import { Button, Result } from "antd";
import React from "react";

const NoFoundPage = ({ history }) => (
  <div className="empty-page h-100vh d-flex-c">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => history.goBack()} type="primary">
          Go Back
        </Button>
      }
    />
  </div>
);

export default NoFoundPage;
