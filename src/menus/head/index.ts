import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';
import { DropListMenu } from '../../menus/menuItem/dropListMenu';

export class Head extends MenuActive implements MenuItem {

  private editor: Editor;
  constructor(editor: Editor) {
    super();
    this.editor = editor;
    const el = this.createElem();
    new DropListMenu(el, { childList: this.createChild() });
    this.initMenu(el);
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="标题">
      H
     </div>`
  );

  private createChild = () => {
    const headList = this.editor.config.menusConfig.head;
    return headList.map(head => {
      head.el?.addEventListener('click', () => this.clickHandler(head.value));
      return head.el;
    });
  };

  private clickHandler = (value: string) => {
    this.editor.command.do('formatBlock', value);
  };


}