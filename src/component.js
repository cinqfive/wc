export class Component {
  /** @var {Element} element */
  element = null;

  /**
   *
   * @param {Element} element
   */
  constructor(element) {
    if (!element) {
      element = document.createElement("div");
      document.body.appendChild(element);
      element.classList.add("component");
    }

    this.element = element;
    this.element.classList.add("invisible");
  }

  show() {
    this.element.classList.remove("invisible");
  }

  hide() {
    this.element.classList.add("invisible");
  }

  addClass(classname) {
    this.element.classList.add(classname);
  }

  removeClass(classname) {
    this.element.classList.remove(classname);
  }

  close() {
    this.element.remove();
  }

  /**
   * Append the this component to the other component in argument
   * @param {Component} component
   */
  appendTo(component) {
    component.#appendChild(this.element);
  }

  #appendChild(element) {
    this.element.appendChild(element);
  }

  /**
   * @param {{ top?: number; bottom?: number; left?: number; right?: number }}
   */
  setFixPositionning(coordinates) {
    const styles = ["position: fixed"];

    Object.entries(coordinates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        styles.push(`${key} : ${value}px`);
      }
    });

    this.element.style = styles.join(";");
  }
}
