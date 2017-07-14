import $ from 'properjs-hobo';
import ContactForm from './components/ContactForm';
import lazySizes from 'lazysizes';
import avoidOrphan from './utils/avoid-orphan';
import emitter from './utils/emitter';
import MobileNav from './components/MobileNav';
import { modules } from './utils/module-loader';
import Navigation from './components/Navigation';
import resizer from './utils/resizer';
import ScrollElems from './components/ScrollElems';
import scroller from './utils/scroller';
import ScrollTo from './utils/scroll-to';
import Search from './components/Search';
import SearchButton from './components/SearchButton';

export default class App {
  constructor() {
    this.$scrolls = $('.js-scrolls');
    this.$scrollTos = $('.js-scroll-to');
    this.$orphans = $('.js-avoid-orphan');
    this.orphanArray = [];
    this.moduleInstances = this.getInstances();
    this.initialize();
  }

  initialize() {
    this.searchButton = new SearchButton('.js-search-icon');
    this.mobileNav = new MobileNav('.js-nav-button');
    this.navigation = new Navigation('.js-navigation');
    this.search = new Search('.js-search');
    this._lazyConfig();
    lazySizes.init();
    this._bindEvents();
    this._mapOrphans();
    this._mapScrolls();
    this._mapScrollTos();
    this._printRecipe();
  }

  _lazyConfig() {
    document.addEventListener('lazybeforeunveil', (e) => {
      const bg = e.target.getAttribute('data-bg');
      if (bg) {
        e.target.style.backgroundImage = 'url(' + bg + ')';
      }
    });

    window.lazySizes.config = {
      loadMode: 1,
    };
  }

  _bindEvents() {
    scroller.on('scroll', () => {
      emitter.fire('app--scroll');
    });

    resizer.on('resize', () => {
      emitter.fire('app--resizer');
    });
  }

  _mapOrphans() {
    this.$orphans.each((elem) => {
      this.orphanArray.push(elem);
    });
    this.orphanArray.map((orphan) => {
      avoidOrphan(orphan);
    });
  }

  _mapScrolls() {
    this.$scrolls.each((elem, i) => {
      const $elem = $(this.$scrolls[i]);
      $elem.data('scrolls', new ScrollElems($elem));
    });
  }

  _mapScrollTos() {
    this.$scrollTos.each((elem, i) => {
      const $elem = $(this.$scrollTos[i]);
      $elem.data('scrollTo', new ScrollTo($elem));
    });
  }

  _printRecipe() {
    $('.js-print-recipe').on('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }

  getInstances() {
    return modules.map((module) => {
      const elements = Array.from(document.querySelectorAll(module.class));
      const references = elements.map((el) => {
        return new module.Source(el);
      });

      return {
        name: module.name,
        ref: references,
      };
    });
  }

  tearDown() {
    this.moduleInstances.forEach((item) => {
      item.ref.forEach((ref) => {
        if (ref.teardown) {
          ref.teardown();
        }
      });
    });
  }
}
