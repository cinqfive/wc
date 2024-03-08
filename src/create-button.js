import { Button } from './button';
import { Menu } from './menu';

const buttons = [];

export class CreateButton extends Button {
  #menu = new Menu();
  #isOpen = false;

  constructor(element) {
    super(element);
    this.configure();
  }

  configure() {
    this.setupEventListeners();
    this.setUpMenu();
  }

  setUpMenu() {
    const rect = this.element.getBoundingClientRect();
    const top = rect.bottom + 8;
    const left = rect.x;

    this.#menu.setFixPositionning({ left, top });
  }

  setupEventListeners() {
    this.element.addEventListener('click', this._onClick);
  }

  _onClick = () => {
    this.#isOpen = !this.#isOpen;

    if (!this.#isOpen) {
      this.#menu.show();
    } else {
      this.#menu.hide();
    }
  };

  /**
   * Adds an item to the menu
   * @param {string|MenuItem} item
   * @param {() => void} onClick
   */
  addItem(item, onClick) {
    this.#menu.addItem(item, onClick);

    return this;
  }

  static register() {
    document.querySelectorAll('.create-button').forEach((element) => {
      buttons.push(new CreateButton(element));
    });
  }

  /**
   * Returns the first instance of CreateButton found on the page
   * @returns {CreateButton}
   */
  static first() {
    return buttons[0];
  }
}
