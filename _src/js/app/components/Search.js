import $ from 'properjs-hobo';
import emitter from '../utils/emitter';

export default class Search {
  constructor(elem) {
    this.$search = $(elem);
    this.$searchOpen = $('.js-search-open');
    this.$searchClose = $('.js-search-close');
    this.$searchInput = document.querySelector('.js-search-input');
    this.searchOpen = false;
    this.disableSearch = false;
    this.$body = $(document.body);

    this.initialize();
  }

  initialize() {
    this._bindEvents();

    emitter.on('app--nav-open', () => {
      this.disableSearch = true;
    });

    emitter.on('app--nav-closed', () => {
      this.disableSearch = false;
    });

    emitter.on('app--search-lock', () => {
      this.disableSearch = true;
    });

    emitter.on('app--search-unlock', () => {
      this.disableSearch = false;
    });
  }

  _bindEvents() {
    this.$searchOpen.on('click', () => {
      this._openSearch();
    });

    this.$searchClose.on('click', () => {
      this._closeSearch();
    });

    window.addEventListener('keyup', this._inputHandler.bind(this));
  }

  _attachEvents() {
    window.addEventListener('keyup', this._escapeHandler.bind(this));
  }

  _detachEvents() {
    window.removeEventListener('keyup', this._escapeHandler.bind(this));
  }

  _inputHandler(event) {
    if (this.disableSearch || event.keyCode === 91) {
      return;
    }

    if ((!this.searchOpen) && event.keyCode >= 65 && event.keyCode <= 90) {
      this.$searchInput.value = event.key;
      this._openSearch();
    }
  }

  _escapeHandler(event) {
    if (this.searchOpen && event.keyCode === 27) {
      this._closeSearch();
    }
  }

  _openSearch() {
    this.$searchInput.focus();
    this.$search.addClass('-active');
    this.$body.addClass('no-scroll');
    this._attachEvents();
    this.searchOpen = true;
  }

  _closeSearch() {
    this.$search.removeClass('-active');
    this.$body.removeClass('no-scroll');
    this._detachEvents();
    this.searchOpen = false;
  }
}
