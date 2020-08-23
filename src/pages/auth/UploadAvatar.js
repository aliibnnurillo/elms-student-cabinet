import React, { useState } from "react";
import { Row, Col, Button, Upload, message } from "antd";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import { API_URL } from "../../constants";
import { uploadFileToServer } from "../../common/services/common";
import { UserIcon } from "../../component/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./auth.css";

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

const UploadAvatar = ({ onUploadFinish = () => null, form }) => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  const uploadProps = {
    action: `${API_URL}/resources/storeImage`,
    accept: ".jpg, .jpeg, .png",
    name: "files[]",
    listType: "picture-card",
    showUploadList: false,
    className: "avatar-uploader",

    beforeUpload,
    onStart(file) {
      setLoading(true);
    },
    multiple: false,
    onSuccess(ret, file) {
      getBase64(file, (imageUrl) => {
        setPhoto(imageUrl);
        setLoading(false);
      });
      if (Array.isArray(ret) && ret.length) {
        onUploadFinish({ profile_img: ret[0].id });
      }
    },
    onError(err) {
      setLoading(false);
    },
    onProgress({ percent }, file) {},
    customRequest({
      action,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      const formData = new FormData();

      formData.append(filename, file);

      uploadFileToServer({
        action,
        formData,
        withCredentials,
        headers,
        onProgress,
        onSuccess,
        onError,
        file,
      });

      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };

  const [t] = useTranslation();

  const uploadButtonOne = (
    <div>
      {loading ? (
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
  const uploadButtonTwo = (
    <div>
      <div className="ant-upload-text">
        <CameraFilled />
      </div>
    </div>
  );
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
            <div className="upload">
              <Upload {...uploadProps}>
                {photo ? (
                  <>
                    <img src={photo} alt="avatar" style={{ width: "100%" }} />
                    {uploadButtonTwo}
                  </>
                ) : (
                  uploadButtonOne
                )}
              </Upload>{" "}
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
