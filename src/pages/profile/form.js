import React, { useState, useEffect } from "react";
import { Upload } from "antd";
import { API_URL } from "../../constants";
import { LoadingOutlined, CameraFilled } from "@ant-design/icons";
import { beforeUpload, isExistUser, getUser } from "../../common/utils/utils";
import { uploadFileToServer } from "../../common/services/common";

const OperationForm = ({ onUploadFinish = () => null, reloadProfileInfo }) => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    isExistUser() && setPhoto(getUser().avatar);
  }, []);

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
      if (Array.isArray(ret) && ret.length) {
        setPhoto(ret[0].file_url);
        setLoading(false);
        onUploadFinish({ profile_img: ret[0].id }).then(() => {
          reloadProfileInfo();
        });
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
      <CameraFilled />
    </div>
  );
  const uploadButtonTwo = (
    <div>{loading ? <LoadingOutlined /> : <CameraFilled />}</div>
  );

  return (
    <Upload {...uploadProps}>
      {photo ? (
        <>
          <img src={photo} alt="avatar" style={{ width: "100%" }} />
          {uploadButtonOne}
        </>
      ) : (
        uploadButtonTwo
      )}
    </Upload>
  );
};

export default OperationForm;
