import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';
import { DropListMenu } from '../../menus/menuItem/dropListMenu';

export class FontSize extends MenuActive implements MenuItem {

  private editor: Editor;
  constructor(editor: Editor) {
    super();
    this.editor = editor;
    const el = this.createElem();
    new DropListMenu(el, { childList: this.createChild() });
    this.initMenu(el);
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="字号">
      F
     </div>`
  );

  private createChild = () => {
    const fontList = this.editor.config.menusConfig.fontSize;
    return fontList.map(font => {
      const el = $(`<div>${font.size}</div>`);
      el?.addEventListener('click', () => this.clickHandler(font.value));
      return el;
    });
  };

  private clickHandler = (font: string) => {
    this.editor.command.do('fontSize', font);
  };


}