import { Component } from './component';

function createElement() {
  const element = document.createElement('li');
  element.classList.add('component');
  element.classList.add('menu');
  element.classList.add('invisible');
  document.body.appendChild(element);

  return element;
}

export class Menu extends Component {
  constructor(element = null) {
    super(element || createElement());
  }

  /**
   * Appends an item to the menu
   * @param {string|MenuItem} item
   * @param {() => void} onClick
   */
  addItem(item, onClick) {
    if (typeof item === 'string') {
      this.appendChild(this.#createMenuItem(item, onClick));
    } else {
      item.appendTo(this);
    }
  }

  #createMenuItem(item, onClick) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('component');
    itemElement.classList.add('menu-item');
    itemElement.innerText = item;
    itemElement.addEventListener('click', () => {
      onClick?.();
      this.hide();
    });

    return itemElement;
  }
}

export class MenuItem extends Component {}
