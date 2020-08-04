import { client } from '../common/utils/request';
import { action, computed, observable, runInAction } from 'mobx';
import flash from './Flash';
import { CURRENT_LANG } from '../constants';
import { getUni, isExistUni } from '../common/utils/utils';

const university_id = isExistUni() && getUni().id;
class CommonStore {
  constructor(url) {
    this.url = url;
  }
  @observable list = [];
  @observable single = [];
  @observable state = ''; // pending, done, error
  @observable languages = [];
  @observable translatingLang = CURRENT_LANG();
  @observable currentItem = {};
  @observable filterVisible = false;

  @action
  setFilterVisible = (visible) => {
    this.filterVisible = visible;
  };

  @computed
  get operationSuccess() {
    return this.state === 'done';
  }

  @computed
  get langItems() {
    return (
      Array.isArray(this.single) && this.single.map((item) => item.language)
    );
  }

  @action
  setTranslatingLang = (lang) => {
    this.translatingLang = lang;
  };

  @computed
  get isLoading() {
    return this.state === 'pending';
  }

  @action
  setState = (val) => {
    this.state = val;
  };

  @action
  fetchAll = async ({ url = this.url, params } = {}) => {
    this.state = 'pending';
    this.list = [];

    try {
      const response = await client({
        url,
        params: {
          language: CURRENT_LANG(),
          university_id: isExistUni() && getUni().id,
          ...params,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        runInAction(() => {
          this.state = 'done';
          this.list = Array.isArray(data.result.data) && data.result.data;
        });
      }
    } catch (error) {
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };

  @action
  check = async ({ url = this.url, id, params } = {}) => {
    this.setState('pending');
    this.currentItem = {};
    try {
      const response = await client({
        url: `${url}/${id}`,
        params: { university_id, ...params },
      });
      const { status, data } = response;
      if (status === 200) {
        runInAction(() => {
          this.currentItem = data.result.length
            ? data.result[0]
            : { id, ...params };
          this.state = 'done';
        });
      }
    } catch (error) {
      this.currentItem = { id, ...params };
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };

  @action
  read = async ({ url = this.url, id, params } = {}) => {
    this.setState('pending');
    this.single = [];
    try {
      const response = await client({
        url: `${url}/${id}`,
        params: { university_id, ...params },
      });
      const { status, data } = response;
      if (status === 200) {
        runInAction(() => {
          this.single = data.result;
          this.state = 'done';
        });
      }
    } catch (error) {
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };

  @action
  create = async ({ url = this.url, credentials } = {}) => {
    this.state = 'pending';
    try {
      const params = credentials.id ? { id: credentials.id } : {};
      const response = await client({
        method: 'post',
        url,
        params,
        data: credentials,
      });
      if (response.status === 200) {
        this.fetchAll();
        this.setState('done');
        flash.setFlash('success', 'Successfully created!');
      }
    } catch (error) {
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };

  @action
  update = async ({ url = this.url, credentials } = {}) => {
    this.state = 'pending';
    try {
      const response = await client({
        method: 'put',
        url: `${url}/${credentials.id}`,
        data: credentials,
      });
      if (response.status === 200) {
        this.fetchAll();
        this.single.length !== 5 && this.read({ id: credentials.id });
        runInAction(() => {
          this.state = 'done';
        });
        flash.setFlash('success', 'Successfully updated!');
      }
    } catch (error) {
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };

  @action
  remove = async ({ url = this.url, id } = {}) => {
    this.state = 'pending';
    try {
      const response = await client({
        method: 'delete',
        url: `${url}/${id}`,
      });
      if (response.status === 200) {
        runInAction(() => {
          this.list = this.list.filter((item) => item.id !== id);
          this.state = 'done';
        });
        flash.setFlash('success', 'Successfully removed!');
      }
    } catch (error) {
      this.setState('error');
      flash.setFlash('error', 'Error occurred!');
    }
  };
}

export default CommonStore;
