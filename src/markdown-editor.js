import { Component } from './component';

export class MarkdownEditor extends Component {
  #onLoadImageClick = null;
  #imageProccurementId = 1;
  #textarea = null;
  #editorIsLocked = false;

  constructor() {
    super(MarkdownEditor.makeHtml());
    this.#setup();
  }

  #setup() {
    this.#setupImageInput();

    this.element
      .querySelector('.load-image-button')
      ?.addEventListener('click', () => {
        this.element
          .querySelector('.file-input')
          .dispatchEvent(new MouseEvent('click'));
      });

    this.#textarea = this.element.querySelector('textarea');
  }

  #setupImageInput() {
    const fileInput = this.element.querySelector('.file-input');

    fileInput.addEventListener('change', async () => {
      if (!fileInput.files.length) return;
      const file = fileInput.files[0];

      const cursorPos = this.#textarea.selectionEnd;
      const valueBeforeCursor = this.#textarea.value.substring(0, cursorPos);
      const valueAfterCursor = this.#textarea.value.substring(
        cursorPos,
        this.#textarea.value.length,
      );
      const imageProccurementId = this.#imageProccurementId++;
      const textToInsert = ` <! Chargement de l'image [${file.name}] (pid: ${imageProccurementId})--> `;

      this.#textarea.value =
        valueBeforeCursor + textToInsert + valueAfterCursor;

      const fileURL = await this.#onLoadImageClick?.(file);

      while (this.#editorIsLocked);

      const markdownImageUrl = ` ![Image ${imageProccurementId}](${fileURL}) `;
      this.#textarea.value = this.#textarea.value.replace(
        textToInsert,
        markdownImageUrl,
      );
    });
  }
  /**
   * Register an event listener on the editor
   * @param {'load_image'} event The even type
   * @param {Function} callback The callback to to invoke in case of the event occurring
   */
  addEventListener(event, callback) {
    if (event === 'load_image') {
      this.#onLoadImageClick = callback;
    }
  }

  static makeHtml() {
    const element = document.createElement('div');
    const toolbar = document.createElement('div');
    const textArea = document.createElement('textarea');

    toolbar.innerHTML = `
      <input type="file" accept="image/*" class="file-input" style="display: none" >
      <button class="action-button load-image-button">
        <span class="material-symbols-outlined">upload_file</span>
      </button>
    `;

    toolbar.classList.add('toolbar');
    element.classList.add('editor-container');
    element.appendChild(toolbar);
    element.appendChild(textArea);

    return element;
  }

  getContent() {
    return this.element.querySelector('textarea').value;
  }

  addErrorStyle() {
    const textArea = this.element.querySelector('textarea');
    textArea.classList.add('error');
  }

  removeErrorStyle() {
    const textArea = this.element.querySelector('textarea');
    textArea.classList.remove('error');
  }
}
