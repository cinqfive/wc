import { Overlay } from './overlay';

export class DisposablePanel extends Overlay {
  constructor(title) {
    super(title, Overlay.DisplayType.Panel);
  }
}
