import React, { useState } from "react";
import { Upload } from "antd";
import { API_URL } from "../../constants";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import { beforeUpload, getBase64 } from "../../common/utils/utils";
import { uploadFileToServer } from "../../common/services/common";
import { useTranslation } from "react-i18next";

const OperationForm = ({ onUploadFinish = () => null, form }) => {
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

  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <CameraFilled />}</div>
  );

  return (
    <Upload {...uploadProps}>
      {photo ? (
        <img src={photo} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default OperationForm;
