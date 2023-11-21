import "./component.scss"

export class Component {
    element = null;

    constructor(element) {
        this.element = element;
        this.element.classList.add('invisible');
    }

    show() {
        this.element.classList.remove('invisible');
    }

    hide() {
        this.element.classList.add('invisible');
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
}
