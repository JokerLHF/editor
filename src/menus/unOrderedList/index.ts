import { $ } from '../../utils';
import { MenuItem } from '../menuItem/type';
import { MenuActive } from '../menuItem';
import { Editor } from '../../editor';
import { transformToUnOrderedList } from './utils';

export class UnorderedList extends MenuActive implements MenuItem {
  private editor: Editor;

  constructor(editor: Editor) {
    super();
    this.editor = editor;
    this.initMenu(this.createElem());
  }

  private createElem = () => $(
    `<div class="editor-menu-item" data-title="有序列表">ul</div>`
  )

  public handleClick = (e: Event) => {
    const list = this.editor.selection.getSelectionRangeTopNodes();
    transformToUnOrderedList(list, this.editor);
  }

}