import { Component } from './component';
import { DialogMask } from './dialog-mask';

export class Overlay extends Component {
  #mask = new DialogMask();
  static DisplayType = {
    Dialog: 'dialog',
    Panel: 'panel',
  };

  constructor(display = Overlay.DisplayType.Dialog) {
    super();
    this.element.ClassList.add('overlay');

    if (display === Overlay.DisplayType.Dialog) {
      this.element.ClassList.add('dialog');
    } else {
      this.element.classList.add('panel');
    }
  }
}
