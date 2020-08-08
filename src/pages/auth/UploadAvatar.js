import React, { useState } from "react";
import { Row, Col, Button, Upload, message } from "antd";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import "./auth.css";
import { UserIcon } from "../../component/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

const UploadAvatar = () => {
  const [state, setState] = useState({
    loading: false,
  });

  const [t] = useTranslation();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setState({ loading: false, imageUrl })
      );
    }
  };
  const uploadButton = (
    <div>
      {state.loading ? (
        <LoadingOutlined />
      ) : (
        <div className="user-icon">
          <UserIcon />
        </div>
      )}
      <div className="ant-upload-text">
        <CameraFilled />
      </div>
    </div>
  );
  return (
    <div className="enter-email empty-page">
      <Row>
        <Col span={6} offset={9}>
          <div className="new-email">
            <div className="upload">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {state.imageUrl ? (
                  <img
                    src={state.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
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

export default UploadAvatar;
