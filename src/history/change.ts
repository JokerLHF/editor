import { debounce } from 'lodash';
import { Editor } from '../editor';
import { Mutation } from './node/mutation';

export class Change {
  private editor: Editor;
  private data: MutationRecord[] = [];
  private mutation: Mutation;
  private isComposition: boolean = false;

  constructor(editor: Editor) {
    this.editor = editor;
    this.mutation = new Mutation(this.saveMutationData);
    this.bindComposionEvent();
  }

  private saveMutationData = (mutations: MutationRecord[]) => {
    this.data.push(...mutations);
    this.debounceSaveToHistory();
  }

  public listen = () => {
    const node = this.editor.textContainer!;
    this.mutation.observe(node);
  }
  public unListen = () => {
    this.mutation.disconnect();
  }

  private saveToHistoryCache = () => {
    if (!this.isComposition) {
      this.editor.history.save([...this.data]);
      this.data.length = 0;
    }
  }
  private debounceSaveToHistory = debounce(this.saveToHistoryCache, 100);


  private bindComposionEvent = () => {
    // 监听开始输入中文和输入中文结束
    this.editor.textContainer?.addEventListener('compositionstart', () => {
      this.isComposition = true;
    });
    this.editor.textContainer?.addEventListener('compositionend', () => {
      this.isComposition = false;
    });
  }
}