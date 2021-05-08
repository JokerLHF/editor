import { Editor } from '../editor';
import { $ } from '../utils';

let EDITOR_ID = 1;
export class Layout {

  private editor: Editor;
  constructor(editor: Editor) {
    this.editor = editor;
    this.createLayout();
  }

  public createLayout = () => {
    if (!this.editor.editorContainer) return

    const $toolbar = $('<div id="editor-toolbar"></div>')!;
    const $textContent = $('<div id="editor-textContent"></div>')!;
    $textContent.setAttribute('contenteditable', 'true');

    this.editor.textContainer = $textContent;
    this.editor.toolbarContainer = $toolbar;
    this.editor.editorContainer.append($toolbar);
    this.editor.editorContainer.append($textContent);
    this.editor.editorContainer.dataset.editorId = `${EDITOR_ID++}`;
  }

}