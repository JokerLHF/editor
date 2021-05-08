import { Editor } from './editor/index'

const editor = new Editor(
  document.querySelector('#edtior'),
);

(window as any).editor = editor;
editor.create();
