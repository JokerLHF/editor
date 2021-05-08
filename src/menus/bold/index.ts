import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';

export class Bold extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="加粗">
      Bold
    </div>`
  )

  public handleClick = (e: Event) => {
    this.editor.command.do('bold');
  }

  public changeActive = () => {
    const state = this.editor.command.queryCommandState('bold');
    state ? this.active() : this.unActive();
  }
}