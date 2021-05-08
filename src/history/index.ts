import { Editor } from '../editor';
import { Cache } from './cache/cache';
import { Change } from './change';
import { revoke, restore } from './node/decompile';
import { compile, Compile } from './node/compile';

export class History {
  private cache: Cache<Compile[]>;
  private changeEvent: Change;

  constructor(editor: Editor) {
    this.changeEvent = new Change(editor);
    this.cache = new Cache(editor.config.historyConfig?.maxSize);

    this.changeEvent.listen();
  }

  public save = (mutations: MutationRecord[]) => {
    this.cache.save(compile(mutations));
  }

  // 恢复 (恢复撤销的数据)
  public restore = () => {
    this.changeEvent.unListen();
    this.cache.restore(restore);
    this.changeEvent.listen();
  }

  // 撤销
  public revoke = () => {
    // 取消监听mutation
    this.changeEvent.unListen();
    this.cache.revoke(revoke);
    this.changeEvent.listen();
  }

}