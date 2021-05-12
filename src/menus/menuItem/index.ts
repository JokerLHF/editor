import { DomElement } from '../../editor/type';

class Menu {
  public $elem: DomElement = null;

  protected initMenu = (el: DomElement) => {
    this.$elem = el;
    this.bindClickEvent();
  }

  private bindClickEvent = () => {
    this.$elem?.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      this.handleClick(e);
    });
  }

  // 子类重写点击事件
  public handleClick = (e: Event) => { }

}

export class MenuActive extends Menu {
  public is_active: boolean = false;

  protected active(): void {
    this.is_active = true
    this.$elem?.classList.add('editor-menu-active')
  }

  protected unActive(): void {
    this.is_active = false
    this.$elem?.classList.remove('editor-menu-active')
  }
}




