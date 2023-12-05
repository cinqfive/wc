export * from "./input";
import { Component } from "./component";
import { Input } from "./input";
import { List } from "./list";
import "./search-input";

const searchInputs = [];

export class SearchInput extends Input {
  #resultPanel = new SearchResultPanel();
  #controller = new SearchController();

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

    this.element.addEventListener("input", this.onInput);
    this.#resultPanel.addClass("result-panel");
    this.#resultPanel.setFixPositionning({
      left: left,
      top: top,
    });
    this.#resultPanel.hide();
  }

  addResultRow(listItem) {
    this.#resultPanel.addRow(listItem);
  }

  onFocus() {
    this.#resultPanel.show();
  }

  onBlur() {
    this.#resultPanel.hide();
  }

  onInput = ({ data }) => {
    this.#controller.search(data, this.onSearchResults);
  }

  onSearchResults = (result) => {
    result.forEach((r) => this.#resultPanel.addRow(this.#controller.convertResultRowToListItem(r)));
  }

  setSearchController(controller) {
    this.#controller = controller;
  }

  static register() {
    document.querySelectorAll(".search-input").forEach((element) => {
      const searchPanel = new SearchInput(element);
      searchInputs.push(searchPanel);
    });
  }

  /**
   * Finds a serach input by its id.
   * @param {string} id The id to lookup
   * @returns {SearchInput}
   */
  static getById(id) {
    return searchInputs.find(s => s.element.id === id);
  }
}



class SearchResultPanel extends Component {
  #list = new List();

  constructor() {
    super();

    this.#list.appendTo(this);
    this.element.classList.add("result-panel");
  }

  addRow(row) {
    this.#list.addItem(row);
  }

  removeRows() {
    this.#list.removeChildren();
  }
}

export class SearchController {
  search(name, callback) {
    name;
    callback;
  }

  convertResultRowToListItem(resultRow) {
    resultRow;
  }
}
