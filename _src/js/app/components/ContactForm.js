import emitter from '../utils/emitter';

const SELECTORS = {
  INPUT_WRAPPERS: '.js-input-wrapper',
  INPUT: '.js-input',
  INPUT_LABEL: '.js-input-label',
};

export class ContactForm {
  constructor(elem) {
    this.$elem = elem;
    this.inputWrappers = Array.from(
      this.$elem.querySelectorAll(SELECTORS.INPUT_WRAPPERS)
    );
    this.allInputs = Array.from(
      this.$elem.querySelectorAll(SELECTORS.INPUT)
    );

    this.initialize();
  }

  initialize() {
    this._bindEvents();
  }

  _bindEvents() {
    this.inputWrappers.forEach((wrapper) => {
      const $input = wrapper.querySelector(SELECTORS.INPUT);
      $input.addEventListener('focus', () => {
        this._activateInput(wrapper);
        emitter.fire('app--search-lock');
      });
      $input.addEventListener('blur', () => {
        if (!$input.value) {
          this._deactivateInput(wrapper);
        }
        emitter.fire('app--search-unlock');
      });
      window.addEventListener('keyup', () => {
        if ($input.value) {
          this._activateInput(wrapper);
        }
      });
    });
  }

  _activateInput(element) {
    element.classList.add('active');
  }

  _deactivateInput(element) {
    element.classList.remove('active');
  }

  teardown() {
    this.inputWrappers.forEach((wrapper) => {
      const $input = wrapper.querySelector(SELECTORS.INPUT);
      $input.removeEventListener('focus', () => {
        this._activateInput(wrapper);
      });
      $input.removeEventListener('blur', () => {
        if (!$input.value) {
          this._deactivateInput(wrapper);
        }
      });
    });
  }
}
