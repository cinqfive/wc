import { Component } from "./component";

const inputs = [];

export class Input extends Component {
  constructor(element) {
    super(element);
    this.element.addEventListener("focus", this._onFocus);
    this.element.addEventListener("blur", this._onBlur);
  }
  onInput = () => {};

  onFocus() {}

  _onFocus = (evt) => {
    this.onFocus(evt);
  };

  _onBlur = (evt) => {
    this.onBlur(evt);
  };

  onBlur() {}

  static register() {
    document.querySelectorAll(".input").forEach((element) => {
      const input = new Input(element);
      inputs.push(input);
    });
  }
}
