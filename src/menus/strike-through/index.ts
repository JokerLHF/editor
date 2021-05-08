import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';

export class StrikeThrough extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="删除线">
      S
    </div>`
  )

  public handleClick = (e: Event) => {
    this.editor.command.do('strikeThrough');
  }

  public changeActive = () => {
    const state = this.editor.command.queryCommandState('strikeThrough');
    state ? this.active() : this.unActive();
  }
}