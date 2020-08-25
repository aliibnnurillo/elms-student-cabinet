import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../auth.css";
import OperationForm from "./OperationForm";
import { inject, observer } from "mobx-react";

const UploadAvatar = ({ authStore: { uploadNewAvatar } }) => {
  const [t] = useTranslation();
  const [profileImg, setProfileImg] = useState("");

  const history = useHistory();

  const handleUpload = () => {
    uploadNewAvatar(profileImg).then((res) => {
      if (res.status === 200) history.push("/");
    });
  };

  return (
    <div className="enter-email empty-page">
      <Row>
        <Col
          span={20}
          offset={2}
          sm={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
        >
          <div className="new-email">
            <OperationForm setProfileImg={setProfileImg} />
            <p>{t("Rasmingizni yuklang")}</p>

            <Button
              type="primary"
              className="login-form-button"
              onClick={handleUpload}
              block
            >
              {t("Saqlash")}
            </Button>
            <Link to="/" className="next-link">
              {t("Otkazib yuborish")}
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default inject("authStore")(observer(UploadAvatar));
