import { Button } from './button';
import { Component } from './component';

const caroussels = [];

/**
 * Makes chevorn HTML
 * @param {'left' | 'right'} orientation
 * @returns {string}
 */
function makeChevronHtml(orientation) {
  return `<img src="assets/chevron-${orientation}-icon.png" alt="Chevron ${orientation}"/>`;
}

export class Caroussel extends Component {
  #chevronRight = null;
  #chevronLeft = null;

  constructor(element) {
    super(element);
    this.setup();
  }

  setup() {
    const items = this.element.querySelectorAll('.caroussel-item');
    const chevronLeft = document.createElement('div');
    const chevronRight = document.createElement('div');
    chevronLeft.classList.add('navigation-chevron');
    chevronRight.classList.add('navigation-chevron');
    chevronLeft.classList.add('left');
    chevronRight.classList.add('right');
    chevronLeft.innerHTML = makeChevronHtml('left');
    chevronRight.innerHTML = makeChevronHtml('right');

    this.#chevronLeft = new Button(chevronLeft);
    this.#chevronRight = new Button(chevronRight);

    this.#chevronLeft.appendTo(this);
    this.#chevronRight.appendTo(this);

    if (items.length > 1) {
      this.#chevronLeft.show();
      this.#chevronRight.show();
    }

    const width = window.innerWidth;
    items.forEach(item => {
      item.style = `width: ${width}px`;
    });
  }

  static register() {
    document.querySelectorAll('.caroussel').forEach((element) => {
      const caroussel = new Caroussel(element);
      caroussels.push(caroussel);
    });
  }
}
