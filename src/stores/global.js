import { observable, action } from "mobx";
import { CURRENT_LANG } from "../constants";

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
  };

  @action
  toggleSidebar = () => {
    this.collapsed = !this.collapsed;
  };
}

const global = new Global();

export default global;
