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
  #items = null;
  #currentIndex = 0;

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
      this.#chevronRight.show();

      this.#chevronLeft.addOnClickListener(() => {
        if (this.#currentIndex > 0) {
          this.#items[this.#currentIndex].classList.remove('current');
          this.#items[--this.#currentIndex].classList.add('current');
          this.#setBgColor();
          this.#chevronCheck();
        }
      });

      this.#chevronRight.addOnClickListener(() => {
        if (this.#currentIndex < this.#items.length - 1) {
          this.#items[this.#currentIndex].classList.remove('current');
          this.#items[++this.#currentIndex].classList.add('current');
          this.#setBgColor();
          this.#chevronCheck();
        }
      });
    }

    const width = window.innerWidth;
    items.forEach((item) => {
      item.style = `width: ${width}px`;
    });
    this.#items = items;
    this.#setBgColor();
  }

  #setBgColor() {
    const bgcolor = this.#items[this.#currentIndex].dataset.bgcolor;

    this.element.style['background-color'] = bgcolor;
  }

  #chevronCheck() {
    if (this.#currentIndex === 0) {
      this.#chevronLeft.hide();
    } else if (this.#currentIndex >= this.#items.length - 1) {
      this.#chevronRight.hide();
    } else {
      this.#chevronLeft.show();
      this.#chevronRight.show();
    }
  }

  static register() {
    document.querySelectorAll('.caroussel').forEach((element) => {
      const caroussel = new Caroussel(element);
      caroussels.push(caroussel);
    });
  }
}
