import { $ } from '../../utils';
import { MENU_TYPE, MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';

export class Underline extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="下划线">
      U
    </div>`
  )

  public handleClick = (e: Event) => {
    this.editor.command.do('underline');
  }

  public changeActive = () => {
    const state = this.editor.command.queryCommandState('underline');
    state ? this.active() : this.unActive();
  }
}