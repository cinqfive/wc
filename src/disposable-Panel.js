import { Component } from './component';

function createElement() {
  const element = document.createElement('div');
  element.classList.add('disposable-panel');
  return element;
}

export class DisposablePanel extends Component {
  #mask = document.createElement('div');
  #closeButton = null;

  static Disposition = {
    Left: 'left',
    Right: 'right',
  };

  #disposition = DisposablePanel.Disposition.Right;

  constructor(disposition = DisposablePanel.Disposition.Right) {
    super(createElement());

    this.#disposition = disposition;
    this.setup();
  }

  setup() {
    this.#mask.classList.add('dialog-mask');
    document.body.appendChild(this.element);
    document.body.appendChild(this.#mask);

    if (this.#disposition === DisposablePanel.Disposition.Left) {
      this.element.classList.add('left');
    } else {
      this.element.classList.add('right');
    }

    return;
  }

  registerCloseEventListener() {
    this.#closeButton = this.element.querySelector('[role="close-button"]');
    this.#closeButton?.addEventListener('click', () => this.close());
  }

  close() {
    this.#mask.remove();
    super.close();
  }
}
