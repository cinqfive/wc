import { Button } from './button';
import { Component } from './component';

const forms = [];

export class Form extends Component {
  #children = [];
  constructor(element) {
    super(element);
    this.#setup();
  }

  #setup() {
    this.#registerChildren();
  }

  #registerChildren() {
    this.element.querySelectorAll('.input-field').forEach((element) => {
      const child = new Field(element);
      child.appendTo(this);
      this.#children.push(child);
    });

    const submit = new Button(document.createElement('button'), 'Submit');
    submit.appendTo(this);
  }

  /**
   * Gest a child field by its id
   * @param {string} id
   * @returns {Field|undefined}
   */
  getChildById(id) {
    return this.#children.find((child) => child.id === id);
  }

  static register() {
    document.querySelectorAll('form').forEach((form) => {
      forms.push(new Form(form));
    });
  }

  /**
   * Gets a form by its id
   * @param {id} id
   * @returns {Form}
   */
  static getById(id) {
    return forms.find((f) => f.element.id === id);
  }
}

export class Field extends Component {
  static #html = `
    <span class="placeholder"></span>
    <div class="input-container"></div>
    <div class="hint"></div>
    <div class="error"></div>
  `;

  /**
   * Creates the field dom structure
   * @param {HTMLInputElement} fieldElement
   * @returns {HTMLDivElement} the field element
   */
  static #makeOuterElement(fieldElement) {
    const field = document.createElement('div');
    field.classList.add('field');

    field.innerHTML = Field.#html;
    field.querySelector('.input-container').appendChild(fieldElement);
    fieldElement.classList.add('input-field');
    return field;
  }

  #input = null;

  constructor(element) {
    super(Field.#makeOuterElement(element));
    this.element?.classList.add('input-field');
    this.#input = this.element.querySelector('.input-field');
    this.id = element.id;
  }

  /**
   * Registers the callback to invoke when the input's value has changed
   * @param {(event: InputEvent) => void} callback
   */
  onChange(callback) {
    this.#input.addEventListener('input', callback);
  }

  /**
   * Gets the value of the field
   * @returns {string} The inner element's value
   */
  getValue() {
    return this.input.value;
  }

  /**
   * Sets the field on error or out of error mode
   * @param {boolean} isOnError
   */
  setIsOnError(isOnError) {
    if (isOnError) {
      this.element.classList.add('error');
      this.element.querySelector('.error').classList.add('visible');
    } else {
      this.element.classList.remove('error');
      this.#removeError();
    }
  }

  /**
   * Sets a hint on the field
   * @param {string} hint
   */
  setHint(text) {
    const hint = this.element.querySelector('.hint');
    hint.innerText = text;
    hint.classList.add('visible');
  }

  removeHint() {
    const hint = this.element.querySelector('.hint');
    hint.innerText = '';
    hint.classList.remove('visible');
  }

  /**
   * Sets the error text to be displayed on the field
   * @param {string} text
   */
  setError(text) {
    this.element.querySelector('.error').innerText = text;
  }

  #removeError() {
    const error = this.element.querySelector('.error');
    error.innerText = '';
    error.classList.remove('visible');
  }
}
