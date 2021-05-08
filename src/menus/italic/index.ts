import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';

export class Italic extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="斜体">
      italic
     </div>`
  );

  public handleClick = () => {
    this.editor.command.do('italic');
  }

  public changeActive = () => {
    const state = this.editor.command.queryCommandState('italic');
    state ? this.active() : this.unActive();
  }
}