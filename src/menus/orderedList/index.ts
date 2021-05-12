import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';
import { transformToOrderedList } from './utils';

export class OrderedList extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="无序列表">ol</div>`
  )

  public handleClick = (e: Event) => {
    const list = this.editor.selection.getSelectionRangeTopNodes();
    transformToOrderedList(list, this.editor);
  }
}