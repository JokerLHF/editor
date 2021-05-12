import { CeilStack } from "./stack";

export class Cache<T> {
  private dataStack: CeilStack<T>;
  private revokeStack: CeilStack<T>;

  constructor(maxSize: number = 0) {
    this.dataStack = new CeilStack(maxSize);
    this.revokeStack = new CeilStack(maxSize);
  }

  public save = (record: T) => {
    this.dataStack.inStack(record);
  }

  // 恢复：   将如何解析交给上一层，Cache只负责存储不应该负责解析
  public restore = (fn: (data: T) => void) => {
    const data = this.revokeStack.outStack();
    if (data) {
      this.dataStack.inStack(data);
      fn(data);
    }
  }

  // 撤销
  public revoke = (fn: (data: T) => void) => {
    const data = this.dataStack.outStack();
    if (data) {
      this.revokeStack.inStack(data);
      fn(data);
    }
  }

}