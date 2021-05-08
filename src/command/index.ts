import { Editor } from '../editor/index';

export class Command {
  private editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
  }

  public do = (name: string, value?: string) => {

    const selection = this.editor.selection

    // 如果无选区，忽略
    if (!selection.getRange()) {
      return
    }

    // 点击的时候选区会变为点击事件的选区，所以需要先删除选区设置为上一此的选区
    selection.restoreSelection();

    document.execCommand(name, false, value);
    // 修改菜单状态
    this.editor.menus.changeActive();
    // 恢复选取保证光标在原来的位置闪烁
    selection.toggleSelection();
  }

  public queryCommandState = (name: string) => {
    return document.queryCommandState(name);
  }

} 