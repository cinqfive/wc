import { Component } from "./component";

export class List extends Component {
  #children = [];

  addItem(item) {
    item.appendTo(this);
    item.show();
    this.#children.push(item);
  }

  removeChildren() {
    this.element.querySelectorAll("*").forEach((e) => e.remove());
  }

  show() {
    super.show();
    this.#children.forEach((c) => c.show());
  }

  hide() {
    super.hide();
    this.#children.forEach((c) => c.hide());
  }
}
