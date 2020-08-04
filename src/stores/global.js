import { observable, action } from 'mobx';
import { CURRENT_LANG } from '../constants';
import { setUni } from '../common/utils/utils';

class Global {
  @observable collapsed = false;
  @observable currentLang = CURRENT_LANG();
  @observable currentUni = {};

  @action
  setCurrentLang = (val) => {
    this.currentLang = val;
  };

  @action
  setCurrentUni = (val) => {
    this.currentUni = val;
    setUni(val);
  };

  @action
  toggleSidebar = () => {
    this.collapsed = !this.collapsed;
  };
}

const global = new Global();

export default global;
