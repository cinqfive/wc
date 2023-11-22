/// moduele
import { Component } from './component';
import './button.scss';

const buttons = []

export class Button extends Component {
    /**
     *
     * @param {HTMLButtonElement} element
     */
    constructor(element) {
        super(element);
        this.setup();
    }

    setup() {
        this.element.addEventListener('click', () => this.onClick());
    }

    addOnClickListener(callback) {
        this.element.addEventListener('click', callback);
    }

    removeEventListener(callback) {
        this.element.removeEventListener('click',callback);
    }

    onClick() {}

    /**
     * Sets fixed coordinates on the element and changes the positioning of element to 'fixed'
     * @param {{ top?: number; bottom?: number; left?: number; right?: number }} coordinates
     */
    setFixedCoordinates(coordinates) {
        const styles = ['position: fixed'];

        Object.entries(coordinates).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                styles.push(`${key} : ${value}px`);
            }
        });

        this.element.style = styles.join(';');
    }

    static register() {
        document.querySelectorAll('.button').forEach((element) => {
            const button = new Button(element);
            buttons.push(button)
        });
    }
}
