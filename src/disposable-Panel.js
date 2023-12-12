import { Component } from "./component";
import { Dialog } from "./dialog";
import "./disposable-panel.scss";

export class DisposablePanel extends Component {
div = new Dialog();

  #mask = null;
  static Disposition = {
    Left: "left",
    Right: "right",
  };

  #disposition = DisposablePanel.Disposition.Right;

  constructor(element, disposition = DisposablePanel.Disposition.Right) {
    super(element);
    this.#mask = document.getElementById("dialog-mask");
    this.#mask.classList.remove("invisible");
    this.element.ClassList.add("disposable-item");
    this.#disposition = disposition;
    this.setup();
  }

  setup() {
    if (this.#disposition === DisposablePanel.Disposition.Right) {
      DisposablePanel.Disposition.Right = 0;
      DisposablePanel.Disposition.Left = "auto";
    } else (this.#disposition === DisposablePanel.Disposition.Left) {
      DisposablePanel.Disposition.Right = "auto";
      DisposablePanel.Disposition.Left = 0;
    }
  }

  show() {
    if (window.screen.width > 1400) {
        this.div.showProduct()
    } else {

  }
}
}
