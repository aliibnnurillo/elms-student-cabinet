import React, { useState } from "react";
import { Upload } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getBase64 } from "../common/utils/utils";
import { uploadFileToServer } from "../common/services/common";
import { API_URL } from "../constants";

const FileUpload = ({
  beforeUpload = () => null,
  onSetFile,
  form,
  icon,
  title,
  name,
  file,
  style,
  isImage = true,
}) => {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : icon}
      <div className="ant-upload-text">{title}</div>
    </div>
  );

  const uploadProps = {
    action: `${API_URL}/resources/${isImage ? "storeImage" : "storeFile"}`,
    name: "files[]",
    accept: isImage ? ".jpg, .jpeg" : undefined,
    listType: "picture-card",
    showUploadList: false,
    className: "file-uploader",
    headers: {
      Authorization: "$prefix $token",
    },
    beforeUpload,
    onStart(file) {
      setLoading(true);
    },
    multiple: false,
    onSuccess(ret, file) {
      getBase64(file, (imageUrl) => {
        onSetFile(imageUrl);
        setLoading(false);
      });
      Array.isArray(ret) &&
        ret.length &&
        form.setFieldsValue({ [name]: ret[0].id });
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
        },
      };
    },
  };

  return (
    <Upload {...uploadProps} style={style}>
      {file ? (
        isImage ? (
          <img
            src={file}
            alt="avatar"
            style={{ width: "100%", borderRadius: 12 }}
          />
        ) : (
          <video
            src={file}
            style={{ width: "100%", borderRadius: 12 }}
            controls
          />
        )
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default FileUpload;
