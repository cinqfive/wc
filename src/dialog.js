import { Component } from './component';

export class Dialog extends Component {
  #mask = document.createElement('div');

  constructor(title) {
    super();
    this.#setup(title);
  }

  #setup(title) {
    document.body.appendChild(this.#mask);
    this.element.classList.add('dialog');

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('title');

    this.#mask.classList.add('dialog-mask');
    document.body.appendChild(this.element);
    this.element.appendChild(titleSpan);

    titleSpan.innerText = title;
  }

  close() {
    this.#mask.remove();
    super.close();
  }
}
