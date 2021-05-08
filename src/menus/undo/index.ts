import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';

export class Undo extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="回退">
      undo
    </div>`
  )

  public handleClick = (e: Event) => {
    this.editor.history.revoke();
  }

  public changeActive = () => {
    console.log('changeActive');
  }
}