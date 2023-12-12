import { Component } from "./component";
import "./dialog.scss";

export class Dialog extends Component {
  #mask = null;
  #closed = false;

  constructor(title) {
    super(document.createElement("dialog"));
    this.#setup(title);
  }

  #setup(title) {
    const titleSpan = document.createElement("span");
    titleSpan.classList.add("title");

    this.#mask = document.getElementById("dialog-mask");
    this.element.open = false;
    document.body.appendChild(this.element);
    this.element.appendChild(titleSpan);

    titleSpan.innerText = title;
  }

  show() {
    if (this.#closed) {
      throw new Error("Boîte de dialogue déja fermée");
    }
    super.show();

    this.element.open = true;
    this.element.classList.add("popup");
    this.#mask.classList.add("visible");
  }

  showProduct(product) {
    super.show();
    this.element.classList.add("list-item");
    this.element.classList.add("product-list-item");
    this.element.innerHTML = `
        <span>${product.name}</span>
        <img src="${product.thumbnailUrl}">
        <span>${product.brand}</span>
        <span>${product.serialNumer}</span>
        <span>${product.type}</span>
        `;
  }

  close() {
    super.close();
    this.element.classList.remove("visible");
    this.#mask.classList.remove("visible");
    this.#closed = true;
  }

  addChild(child) {
    this.element.appendChild(child);
  }
}
