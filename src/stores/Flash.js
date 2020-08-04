import { observable, action } from 'mobx';

class Flash {
  @observable flash = null;

  @action
  setFlash = (type, message) => {
    this.flash = { type, message };
  };

  @action
  clearFlash = () => {
    this.flash = null;
  };
}

const flash = new Flash();
export default flash;
