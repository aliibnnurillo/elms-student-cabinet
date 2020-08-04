import { client } from '../utils/request';
import { CURRENT_LANG, API_URL } from '../../constants';
import {
  setLanguages,
  blobToImageUrl,
  isExistUni,
  getUni,
} from '../utils/utils';
import Axios from 'axios';
import { action, runInAction } from 'mobx';
import flash from '../../stores/Flash';

export const fetchOptions = async ({ url, params } = {}) => {
  return client({
    url,
    params: { language: CURRENT_LANG(), ...params },
  });
};

export const showPhoto = (id, loadingFn, callback) => {
  loadingFn(true);
  Axios({
    url: `${API_URL}/resources/showImage/${id}`,
    responseType: 'blob',
  })
    .then((res) => {
      callback(blobToImageUrl(res.data));
      loadingFn(false);
    })
    .catch((e) => {
      loadingFn(false);
    });
};

export function uploadFileToServer({
  action,
  formData,
  onProgress,
  file,
  onSuccess,
  onError,
}) {
  Axios({
    url: action,
    method: 'post',
    data: formData,
    onUploadProgress: ({ total, loaded }) => {
      onProgress(
        { percent: Math.round((loaded / total) * 100).toFixed(2) },
        file
      );
    },
  })
    .then(({ data: response }) => {
      onSuccess(response.result, file);
    })
    .catch(onError);
}

export const fetchLanguages = async () => {
  try {
    const res = await client({ url: '/languages' });
    if (res.status === 200) {
      setLanguages(res.data ? res.data.result : []);
    }
  } catch (e) {
    throw e;
  }
};

