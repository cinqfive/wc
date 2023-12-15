import { Component } from './component';

export class Dialog extends Component {
  #mask = document.createElement('div');
  #closeButton = null;

  constructor() {
    super();
    this.setup();
  }

  setup() {
    document.body.appendChild(this.#mask);
    this.element.classList.add('dialog');

    this.#mask.classList.add('dialog-mask');
    document.body.appendChild(this.element);
  }

  close() {
    this.#mask.remove();
    super.close();
  }

  registerCloseEventListener() {
    this.#closeButton = this.element.querySelector('[role="close-button"]');
    this.#closeButton?.addEventListener('click', () => this.close());
  }
}
