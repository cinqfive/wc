import { Component } from './component';

export class ListItem extends Component {
  constructor(element, content) {
    super(element);

    if (content instanceof Component) {
      this.element.appendChild(content);
    } else {
      this.element.innerText = content;
    }
  }
}
