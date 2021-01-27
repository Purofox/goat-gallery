import 'styles/index.scss';
import 'styles/pages/materials.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/blur.js';

import 'simplebar';
import 'simplebar/dist/simplebar.css';
import Rellax from "rellax";
import preloader from 'scripts/helpers/preloader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Grid from 'muuri';

preloader(null, () => {
  const rellax = new Rellax('.rellax');
  const grid = new MaterialsGrid('src/media/materials.json', 150);
});


interface MaterialResponse {
  data: Material[],
  total: number;
}

interface Material {
  id: number
  img: string,
  name: string,
  href: string,
  hrefLabel: string;
}

class MaterialsGrid {
  readonly selectSelector = '.quantity-select';
  readonly select = document.querySelector(this.selectSelector);
  readonly optionSelector = '.quantity-select__option';
  readonly selectOptions = this.select.querySelectorAll(this.optionSelector);
  readonly selectValueElement = this.select.querySelector('.quantity-select__value');
  readonly itemsPerPageRange = [36, 48, 60];
  readonly arrowsNext = document.querySelectorAll('.arrows .next');
  readonly arrowsPrev = document.querySelectorAll('.arrows .prev');
  readonly totalElements = document.querySelectorAll('.total');
  readonly toElements = document.querySelectorAll('.to');
  readonly fromElements = document.querySelectorAll('.from');
  grid: Grid;
  private baseUrl: string;
  private params: { [key: string]: string[] };
  private filter = new Filter(params => {
    this.params = params;
    this.loadItems();
  });

  private _items: Material[];

  get items() {
    return this._items;
  }

  set items(items: Material[]) {
    this._items = items;
    this.injectItems();
  }

  private _selectOpen = false;

  get selectOpen(): boolean {
    return this._selectOpen;
  }

  set selectOpen(value: boolean) {
    this._selectOpen = value;
    this.select.classList.toggle('active');
  }

  private _itemsPerPageIndex = 0;

  get itemsPerPageIndex(): number {
    return this._itemsPerPageIndex;
  }

  set itemsPerPageIndex(index: number) {
    this._itemsPerPageIndex = index;
    this.select.querySelector(`${this.optionSelector}.selected`).classList.remove('selected');
    this.selectOptions.item(index).classList.add('selected');

    this.selectValueElement.innerHTML = this.itemsPerPage.toString();
    this.page = 1;
  }

  private _page = 1;

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
    const to = this.itemsPerPage * value;
    if (value === 1) {
      this.arrowsPrev.forEach(el => el.classList.add('disabled'));
      this.arrowsNext.forEach(el => el.classList.remove('disabled'));
    } else if (to >= this.total) {
      this.arrowsNext.forEach(el => el.classList.add('disabled'));
      this.arrowsPrev.forEach(el => el.classList.remove('disabled'));
    } else {
      this.arrowsNext.forEach(el => el.classList.remove('disabled'));
      this.arrowsPrev.forEach(el => el.classList.remove('disabled'));
    }
    this.fromElements.forEach(el => el.innerHTML = (this.itemsPerPage * (value - 1) + 1).toString());
    this.toElements.forEach(el => el.innerHTML = Math.min(to, this.total).toString());
    this.loadItems();
  }

  private _total = 0;

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
    this.totalElements.forEach(el => el.innerHTML = value.toString())
  }

  get itemsPerPage(): number {
    return this.itemsPerPageRange[this.itemsPerPageIndex];
  }

  static toHtml(str): HTMLElement {
    const template = document.createElement('template');
    str = str.trim();
    template.innerHTML = str;
    return template.content.firstChild as HTMLElement;
  }

  constructor(url: string, private injectAnimationTime: number) {
    this.baseUrl = url;
    this.loadItems();

    this.select.addEventListener('click', _ => {
      this.selectOpen = !this.selectOpen;
      setTimeout(_ =>
        document.addEventListener('click', (e) => {
          if (!(<HTMLElement>e.target).closest(this.selectSelector)) {
            this.selectOpen = false;
          }
        }, {once: true}))
    })
    this.selectOptions.forEach((option, index) =>
      option.addEventListener('click', _ => {
        this.itemsPerPageIndex = index;
      }));
    this.arrowsNext.forEach(arrow =>
      arrow.addEventListener('click', _ => this.page++))
    this.arrowsPrev.forEach(arrow =>
      arrow.addEventListener('click', _ => this.page--))
  }

  injectItems(): void {
    document.querySelectorAll('.materials-grid__item')
      .forEach(item => item.classList.remove('active'));
    const template = (item: Material) =>
      `<div class="materials-grid__item">
            <img src="${item.img}" alt="">
            <div class="materials-item__name-wrapper">
                <div class="materials-item__name row">
                    <div class="name">${item.name}</div>
                    <div class="article">#${item.id}</div>
                </div>
                <a href="${item.href}" class="materials-item__link row">
                    ${item.hrefLabel} <img src="src/media/material/angle-down.svg" alt="">
                </a>
            </div>
          </div>`;

    !this.grid && (this.grid = new Grid('.materials-grid', {
      layout: {fillGaps: true, rounding: false}
    }));
    this.items.forEach((item, i) => {
      const wrappedItem = MaterialsGrid.toHtml(template(item));
      wrappedItem.addEventListener('click', e => this.onItemClick(wrappedItem, e));
      this.grid.remove(this.grid.getItems()); // remove all previous item's
      setTimeout(_ => this.grid.add(wrappedItem), this.injectAnimationTime * i)
    });
  }

  onItemClick(item: HTMLElement, e: Event): void {
    const prevActive = document.querySelector('.materials-grid__item.active') as HTMLElement;
    if (!item.classList.contains('active')) {
      prevActive && prevActive !== e.target && prevActive.classList.remove('active');
    }
    item.classList.toggle('active');
    this.grid.refreshItems(this.grid.getItems([prevActive, item])).layout()
  }

  loadItems(): void {
    let filterParamsString = '';
    for (let prop in this.params) {

      filterParamsString += `&${prop}=${this.params[prop].join(',')}`
    }
    fetch(`${this.baseUrl}?page=${this.page}&count=${this.itemsPerPage}${filterParamsString}`)
      .then<MaterialResponse>(response => response.json())
      .then(({data, total}) => {
        this.items = data;
        this.total = total;
      });
  }
}

class Filter {
  resetStickyRequired = false;
  resetDetailRequired = false;
  props: { [key: string]: string[] } = {};
  lastSavedProps: { [key: string]: string[] } = {};
  filterEl: HTMLElement = document.querySelector('.filter');
  stickyActive = true;
  filterElStyle = window.getComputedStyle(this.filterEl);
  applyEl = this.filterEl.querySelector('.apply')
  stickyFillerEl: HTMLElement = this.filterEl.querySelector('.sticky-filler');
  detailEl: HTMLElement = document.querySelector('.filter-preview .detail');
  info: HTMLElement = document.querySelector('.filter-preview .info');
  showFilterEl: HTMLElement = document.querySelector('.show-filter');


  constructor(onUpdate: (params: { [key: string]: string[] }) => void) {
    this.filterEl.style.cssText = 'opacity: 0';
    setTimeout(_ => this.filterEl.style.cssText = '', 500);
    this.filterEl.querySelectorAll('.property--color').forEach((el: HTMLElement) =>
      el.style.cssText = `--bg-color: ${el.dataset.val}`);

    this.showFilterEl.addEventListener('click', _ => {
      document.body.classList.add('has-modal');
      this.filterEl.classList.add('show');
    });

    this.filterEl.querySelectorAll('.filter-row').forEach((row: HTMLElement) => {
      const clone = row.cloneNode(false);
      const rowLabel = row.querySelector('.label').cloneNode(true) as HTMLElement;
      const propWrapper = row.querySelector('.property-wrapper').cloneNode(false) as HTMLElement;
      clone.appendChild(rowLabel);
      clone.appendChild(propWrapper);
      let propsNames = '';

      const propEls = row.querySelectorAll('.property');
      propEls.forEach((prop: HTMLElement, i) => {
        if (prop.matches('.property--color')) {
          propsNames += `<span class="prop prop--color" 
                               data-val="${prop.dataset.val}"
                               style="background: ${prop.dataset.val}"></span>`;
        } else {
          propsNames +=
            `<span class="prop"
                   data-val="${prop.dataset.val}">
                   ${prop.innerHTML}
            </span>${i === propEls.length - 1 ? '' : '<span class="comma">, </span>'}`;
        }

        prop.addEventListener('click', _ => {
          prop.classList.toggle('active');
          const arr = this.props[row.dataset.name];
          if (prop.matches('.active')) {
            prop.setAttribute('aria-pressed', 'true');
            if (!arr) {
              this.props[row.dataset.name] = [prop.dataset.val];
            } else {
              arr.push(prop.dataset.val);
            }
          } else {
            prop.setAttribute('aria-pressed', 'false');
            arr.splice(arr.indexOf(prop.dataset.val), 1);
            if (!arr.length) {
              delete this.props[row.dataset.name];
            }
          }
          let hasChanges = false;
          for (let key in this.lastSavedProps) {
            const prop = this.props[key];
            const lastSavedProp = this.lastSavedProps[key];
            if (!prop || prop.length !== lastSavedProp.length) {
              hasChanges = true;
              break;
            } else {
              for (let val of lastSavedProp) {
                if (prop.indexOf(val) === -1) {
                  hasChanges = true;
                  break;
                }
              }
            }
          }
          const lastKeys = Object.keys(this.lastSavedProps);
          const keys = Object.keys(this.props);
          if (!lastKeys || !keys || Object.keys(this.lastSavedProps).length !== Object.keys(this.props).length) {
            hasChanges = true;
          }
          if (hasChanges) {
            this.applyEl.classList.add('has-changes');
          } else {
            this.applyEl.classList.remove('has-changes');
          }
        });
      });
      propWrapper.innerHTML = propsNames;
      this.info.appendChild(clone);
    });

    this.applyEl.addEventListener('click', _ => {
      const copy = {};
      for (let key in this.props) {
        const val = this.props[key];
        copy[key] = [...val];

        const row = this.info.querySelector(`.filter-row[data-name="${key}"]`);
        if (val.length) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
        }

        row.querySelectorAll('.prop').forEach((el: HTMLElement, i) => {
          let prev = el.previousSibling as HTMLElement;
          !prev?.matches('.comma') && (prev = null);
          if (val.includes(el.dataset.val)) {
            el.classList.add('active');
            prev?.classList.add('active');
          } else {
            el.classList.remove('active');
            prev?.classList.remove('active');
          }
        })

        document.body.classList.remove('has-modal');
        this.filterEl.classList.remove('show');
      }
      this.lastSavedProps = copy;
      this.applyEl.classList.remove('has-changes');
      this.filterEl.classList.remove('show-detail');
      onUpdate(this.props)
    });

    this.filterEl.querySelector('.reset').addEventListener('click', _ => {
      this.props = {};
      this.lastSavedProps = null;
      this.filterEl.querySelectorAll('.property.active').forEach(prop => {
        prop.classList.remove('active');
        prop.setAttribute('aria-pressed', 'false');
      });
      this.info.querySelectorAll('.info .active')
        .forEach(el => el.classList.remove('active'));
      this.filterEl.classList.remove('show-detail');
      document.body.classList.remove('has-modal');
      this.filterEl.classList.remove('show');
      onUpdate(this.props);
    });

    this.filterEl.querySelector('.close').addEventListener('click', _ => {
      document.body.classList.remove('has-modal');
      this.filterEl.classList.remove('show');
    })

    this.detailEl.addEventListener('click', _ => {
      this.filterEl.classList.add('show-detail');
      window.addEventListener('scroll', _ => {
        this.resetDetailRequired = true;
      }, {passive: true, once: true});
    });

    window.addEventListener("resize", this.update.bind(this));
    this.update();

  }

  toggleSticky() {
    if (!this.stickyActive) {
      return;
    }
    requestAnimationFrame(this.toggleSticky.bind(this));
    const rect = this.filterEl.getBoundingClientRect();
    const offset = rect.top;

    if (offset <= 0) {
      this.resetStickyRequired = true;
      this.filterEl.classList.add('is-sticky');
    } else if (this.resetStickyRequired) {
      this.filterEl.classList.remove('is-sticky');
      this.resetStickyRequired = false;
    }

    if (this.resetDetailRequired) {
      this.filterEl.classList.remove('show-detail');
      this.resetDetailRequired = false;
    }
  }

  update(): void {
    const minWidth = 768;

    if (window.innerWidth > minWidth) {
      this.calcFillerHeight();
      this.stickyActive = true;
      requestAnimationFrame(this.toggleSticky.bind(this));
    } else {
      this.stickyActive = false;
      this.stickyFillerEl.style.cssText = '';
      this.filterEl.classList.remove('is-sticky');
    }
  }

  calcFillerHeight(): void {
    const height = this.filterEl.getBoundingClientRect().height;
    const outerHeight = parseInt(this.filterElStyle.getPropertyValue('margin-top')) +
      parseInt(this.filterElStyle.getPropertyValue('margin-bottom')) +
      height;

    this.stickyFillerEl.style.cssText = `height: ${outerHeight}px`;
  }
}



AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
