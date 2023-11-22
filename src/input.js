import { Component } from "./component";

const inputs = []

export class Input extends Component {
    constructor(element) {
        super(element);
        this.element.addEventListener('focus', this.onFocus);
    }
    onInput =()=> {

    }

    onFocus = () => {
    }

    static register() {
        document.querySelectorAll('.input').forEach((element) => {
            const input = new Input(element);
            inputs.push(input);
        });
    }
}
