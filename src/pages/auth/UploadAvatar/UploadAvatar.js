import React, { useState } from "react";
import { Row, Col, Button, Upload, message } from "antd";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import { API_URL } from "../../../constants";
import { uploadFileToServer } from "../../../common/services/common";
import { UserIcon } from "../../../component/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "../auth.css";
import OperationForm from "./OperationForm";
import { inject, observer } from "mobx-react";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const UploadAvatar = ({ uploadAvatar, form }) => {
  const [t] = useTranslation();

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
            <OperationForm />
            <p>{t("Rasmingizni yuklang")}</p>

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              {t("Saqlash")}
            </Button>
            <Link to="" className="next-link">
              {t("Otkazib yuborish")}
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default inject("upload")(observer(UploadAvatar));
