export * from "./input";
import { Component } from "./component";
import { Input } from "./input";
import "./search-input";

const searchInputs = [];

export class SearchInput extends Input {
  #resultPanel = new SearchResultPanel();

  /**
   *
   * @param {HTMLInputElement} element
   */
  constructor(element) {
    super(element);
    this.setup();
  }

  setup() {
    const rect = this.element.getBoundingClientRect();
    const top = rect.bottom + 8;
    const left = rect.x;

    this.element.addEventListener("change", this.onInput);
    this.#resultPanel.addClass("result-panel");
    this.#resultPanel.setFixPositionning({
      left: left,
      top: top,
    });
    this.element.addEventListener("onfocus", this.onFocus);
  }

  onFocus = () => {
    this.#resultPanel.show();
  };

  static register() {
    document.querySelectorAll(".search-box").forEach((element) => {
      const searchPanel = new SearchInput(element);
      searchInputs.push(searchPanel);
    });
  }
}

class SearchResultPanel extends Component {
  #rows = [];

  constructor() {
    super();
    this.element.classList.add("search-input");
  }

  addRow(row) {
    this.#rows.push(row);
    row.appendTo(this);
  }

  removeRows() {
    this.#rows.forEach((element) => {
      element.remove();
    });

    this.#rows = [];
  }
}

class ResultRow extends Component {
  constructor() {
    super();
    this.element.classList.add("result-row");
  }
}
