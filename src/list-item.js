import { Component } from "./component";

export class ListItem extends Component {
  constructor(element, content) {
    super(element);

    if (content instanceof Component) {
      element.appendChild(content);
    } else {
      content.innerText = content;
    }
  }
}
