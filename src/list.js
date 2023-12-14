import { Component } from './component';

export class List extends Component {
  #children = [];

  constructor(element) {
    super(element);

    this.element.classList.add('list');
  }

  addItem(item) {
    item.appendTo(this);
    item.show();
    this.#children.push(item);
  }

  removeChildren() {
    this.element.innerHTML = '';
    this.#children.forEach((c) => c.close());
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
