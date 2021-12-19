import { Button, Result } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";

const NotPermitted = ({ authStore }) => {
  const history = useHistory();
  return (
    <div className={"content home-page"}>
      <div className="empty-page h-100vh d-flex-c">
        <Result
          status="403"
          title="402"
          extra={
            <>
              <Link to="/">
                <Button type="primary">
                  Back {!authStore.authenticated ? "to Login" : "Home"}
                </Button>
              </Link>
              {authStore.authenticated && (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    authStore.logout();
                    setTimeout(() => {
                      history.push("/");
                    }, 0);
                  }}
                >
                  Logout
                </Button>
              )}
            </>
          }
          subTitle="Sorry you are not allowed to enter this page. You have to pay education pay"
        />
      </div>
    </div>
  );
};

export default inject("authStore")(observer(NotPermitted));
