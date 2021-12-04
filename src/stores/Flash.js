import { observable, action } from "mobx";

class Flash {
  @observable flash = null;

  @action
  setFlash = (type, message, duration = 1) => {
    this.flash = { type, message, duration };
  };

  @action
  clearFlash = () => {
    this.flash = null;
  };
}

const flash = new Flash();
export default flash;
