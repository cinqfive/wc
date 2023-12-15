import { Overlay } from './overlay';

export class Dialog extends Overlay {
  constructor(title) {
    super(title, Overlay.DisplayType.Dialog);
  }
}
