import { Component } from './component';

const buttons = [];

export class Button extends Component {
  id = null;
  /**
   * Creates a Button component
   * @param {HTMLButtonElement} element The Button element
   * @param {string} text The button's text
   */
  constructor(element, text) {
    super(element);

    if (text) {
      this.element.innerText = text;
    }

    this.setup();
  }

  setup() {
    this.element.addEventListener('click', () => this.onClick());
    this.id = this.element.id;
  }

  addOnClickListener(callback) {
    this.element.addEventListener('click', callback);
  }

  removeEventListener(callback) {
    this.element.removeEventListener('click', callback);
  }

  onClick() {}

  /**
   * Sets fixed coordinates on the element and changes the positioning of element to 'fixed'
   * @param {{ top?: number; bottom?: number; left?: number; right?: number }} coordinates
   */
  setFixedCoordinates(coordinates) {
    const styles = ['position: fixed'];

    Object.entries(coordinates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        styles.push(`${key} : ${value}px`);
      }
    });

    this.element.style = styles.join(';');
  }

  static register() {
    document.querySelectorAll('.button').forEach((element) => {
      const button = new Button(element);
      buttons.push(button);
    });
  }

  /**
   * Gets a button by its element id
   * @param {string} id The looked up id
   * @returns {Button|undefined} The looked up button or undefined when none is found
   */
  static getById(id) {
    return buttons.find((b) => b.id === id);
  }
}

export class SubmitButton extends Button {
  /**
   * Creates a sybmit type of button component
   * @param {HTMLButtonElement} element the button element
   * @param {string} text The button's text
   */
  constructor(element, text) {
    super(element, text);
    this.element.type = 'submit';
  }
}
