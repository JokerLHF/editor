import { DomElement } from "../../editor/type";
import { $ } from "../../utils";


interface dropConf {
  childList: DomElement[];
}

export class DropListMenu {
  private $el: DomElement;
  private $dropEl: DomElement;

  constructor($el: DomElement, conf: dropConf) {
    this.$el = $el;
    this.$dropEl = $(`<div class="drop-menu-list"></div>`);
    this.init(conf.childList);
  }

  private show = () => {
    this.$dropEl?.setAttribute('style', 'display: block;');
    this.setStyle();
  }

  private hide = () => {
    this.$dropEl?.setAttribute('style', 'display: none;');
  }

  private init = (childList: DomElement[]) => {
    this.setDom(childList);
    this.hide();
    this.$el?.addEventListener('mouseenter', this.show);
    this.$el?.addEventListener('mouseleave', this.hide);
    this.$dropEl?.addEventListener('mouseenter', this.show);
    this.$dropEl?.addEventListener('mouseleave', this.hide);
  }

  private setDom = (childList: DomElement[]) => {
    childList.forEach(child => {
      child?.classList.add('drop-child');
      this.$dropEl?.appendChild(child!);
    });
    document.body.append(this.$dropEl!);
  }

  private setStyle = () => {
    const { top, height, left } = this.$el?.getBoundingClientRect()!;
    this.$dropEl?.setAttribute('style', `top: ${Math.ceil(top + height)}px; left: ${left}px;`)
  }
}