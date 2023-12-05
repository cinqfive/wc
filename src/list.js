import { Component } from "./component";

export class List extends Component {
  addItem(item) {
    item.appendTo(this);
  }

  removeChildren() {
    this.element.querySelectorAll("*").forEach((e) => e.remove());
  }
}
