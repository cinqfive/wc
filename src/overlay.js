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
          <div class="action-buttons-container"><span class="flex-expand"></span></div>`;
  document.body.appendChild(element);
  return element;
}

export class Overlay extends Component {
  #mask = new DialogMask();
  #closeButton = null;
  #positiveActionButton = null;
  #negativeActionButton = null;

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
    super(createElement(title ? title : 'Nouveaux Produit'));
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

  close(ok = false) {
    this.onClose(ok);
    this.#mask.close();
    super.close();
  }

  onClose() {}

  #registerCloseEventListener() {
    this.#closeButton = this.element.querySelector('[role="close-button"]');
    this.#positiveActionButton = this.element.querySelector(
      'button[role="close-button-positive"]',
    );
    this.#negativeActionButton = this.element.querySelector(
      'button[role="close-button-negative"]',
    );

    this.#closeButton?.addEventListener('click', () => this.close());
    this.#negativeActionButton?.addEventListener('click', () => this.close());
    this.#positiveActionButton?.addEventListener('click', () =>
      this.close(true),
    );
  }

  setInnerHTML(html) {
    const content = this.element.querySelector('.overlay-content');

    if (content) content.innerHTML = html;
  }

  addPositiveActionButton(text = 'Valider') {
    this.#positiveActionButton = document.createElement('button');
    this.#positiveActionButton.classList.add('positive-ation-button');
    this.#positiveActionButton.innerText = text;
    this.#positiveActionButton.addEventListener('click', () =>
      this.close(true),
    );
    this.element.querySelector('div.action-buttons-container')?.appendChild(this.#positiveActionButton);
  }

  addNegativeActionButton(text = 'Anunuler') {
    this.#negativeActionButton = document.createElement('button');
    this.#negativeActionButton.classList.add('negative-ation-button');
    this.#negativeActionButton.innerText = text;
    this.#negativeActionButton?.addEventListener('click', () => this.close());
    this.element.querySelector('div.action-buttons-container')?.appendChild(this.#negativeActionButton);
  }
}
