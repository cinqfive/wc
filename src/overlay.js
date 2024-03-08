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
  #shouldDisplayMask = true;

  static DisplayType = {
    Dialog: 'dialog',
    Panel: 'panel',
    FloatingPanel: 'floating-panel',
  };

  static PanelDisposition = {
    Left: 'left',
    Right: 'right',
  };

  /**
   * Builds an Overlay
   * @param {string} title The display title of the overlay
   * @param {'dialog' | 'panel'} display The display type of the overlay
   * @param {'left'|'right'} disposition The disposition of the overlay
   * @param {Element} element An element to be used. When this is passed no new element will be instanciated.
   */
  constructor(
    title,
    display = Overlay.DisplayType.Dialog,
    disposition = Overlay.PanelDisposition.Right,
    element = null,
  ) {
    super(
      element ? element : createElement(title ? title : 'Nouveaux Produit'),
    );
    this.element.classList.add('overlay');
    this.element.classList.add('invisible');

    if (display === Overlay.DisplayType.Dialog) {
      this.element.classList.add('dialog');
    } else if (display === Overlay.DisplayType.Panel) {
      this.element.classList.add('panel');

      if (disposition === Overlay.PanelDisposition.Left) {
        this.element.classList.add('left');
      } else if (disposition === Overlay.PanelDisposition.Right) {
        this.element.classList.add('right');
      }
    } else {
      this.element.classList.add('floating-panel');
    }

    this.#registerCloseEventListener();
  }

  show() {
    if (this.#shouldDisplayMask) {
      this.#mask.show();
    }

    super.show();
  }

  close(ok = false) {
    if (this.onClose(ok)) {
      if (this.#shouldDisplayMask) {
        this.#mask.close();
      }
      super.close();
    }
  }

  onClose() {
    return true;
  }

  #registerCloseEventListener() {
    this.#closeButton = this.element.querySelector('[role="close-button"]');
    this.#positiveActionButton = this.element.querySelector(
      'button[role="close-button-positive"]',
    );

    this.#closeButton?.addEventListener('click', () => this.close());
  }

  setInnerHTML(html) {
    const content = this.element.querySelector('.overlay-content');

    if (content) content.innerHTML = html;
  }

  addPositiveActionButton(text = 'Valider') {
    if (this.#positiveActionButton !== null) {
      this.#positiveActionButton.innerText = text;
      return;
    }

    this.#positiveActionButton = document.createElement('button');
    this.#positiveActionButton.classList.add('positive-action-button');
    this.#positiveActionButton.innerText = text;
    this.#positiveActionButton.addEventListener('click', () =>
      this.close(true),
    );
    this.element
      .querySelector('div.action-buttons-container')
      ?.appendChild(this.#positiveActionButton);
  }

  addNegativeActionButton(text = 'Annuler') {
    if (this.#negativeActionButton !== null) {
      this.#negativeActionButton.innerText = text;
      return;
    }

    this.#negativeActionButton = document.createElement('button');
    this.#negativeActionButton.classList.add('negative-action-button');
    this.#negativeActionButton.innerText = text;
    this.#negativeActionButton?.addEventListener('click', () => this.close());
    this.element
      .querySelector('div.action-buttons-container')
      ?.appendChild(this.#negativeActionButton);
  }

  /**
   * Determines if the dialog blanked should be displayed
   * @param {boolean} val
   */
  setShouldDisplayMask(val) {
    this.#shouldDisplayMask = val;

    if (val) {
      this.#mask.show();
    } else {
      this.#mask.hide();
    }
  }
}
