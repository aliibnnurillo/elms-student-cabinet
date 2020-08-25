import React, { useState } from "react";
import { Upload } from "antd";
import { API_URL } from "../../../constants";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import { beforeUpload, getBase64 } from "../../../common/utils/utils";
import { uploadFileToServer } from "../../../common/services/common";
import { useTranslation } from "react-i18next";
import { UserIcon } from "../../../component/icons";

const OperationForm = ({ onUpload = () => null, form }) => {
  const [t] = useTranslation();

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
        onUpload({ profile_img: ret[0].id });
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
      </Upload>
    </div>
  );
};

export default OperationForm;
