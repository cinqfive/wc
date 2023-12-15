import { Component } from './component';
import { DialogMask } from './dialog-mask';

function createElement(title) {
  const element = document.createElement('div');

  element.innerHTML = `
        <span class="title">${title}</span>
        <button class="close-button" role="close-button">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="overlay-content"></div>
    `;
  document.body.appendChild(element);
  return element;
}

export class Overlay extends Component {
  #mask = new DialogMask();
  #closeButton = null;

  static DisplayType = {
    Dialog: 'dialog',
    Panel: 'panel',
  };

  static PanelDisposition = {
    Left: 'left',
    Right: 'right',
  };

  constructor(
    title,
    display = Overlay.DisplayType.Dialog,
    disposition = Overlay.PanelDisposition.Right,
  ) {
    super(createElement(title));
    this.element.classList.add('overlay');

    if (display === Overlay.DisplayType.Dialog) {
      this.element.classList.add('dialog');
    } else {
      this.element.classList.add('panel');

      if (disposition === Overlay.PanelDisposition.Left) {
        this.element.classList.add('left');
      } else {
        this.element.classList.add('right');
      }
    }

    this.#registerCloseEventListener();
  }

  show() {
    this.#mask.show();
    super.show();
  }

  close() {
    this.#mask.close();
    super.close();
  }

  #registerCloseEventListener() {
    this.#closeButton = this.element.querySelector('[role="close-button"]');
    this.#closeButton?.addEventListener('click', () => this.close());
  }

  setInnerHTML(html) {
    const content = this.element.querySelector('.overlay-content');

    if (content) content.innerHTML = html;
  }
}
