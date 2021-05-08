export class CeilStack<T> {
  private maxSize: number;
  private data: T[] = [];

  constructor(maxSize: number = 0) {
    this.maxSize = maxSize;
  }

  public inStack = (data: T) => {
    // 栈满则清除先入栈的数据
    this.data.unshift(data);
    if (this.data.length > this.maxSize) {
      this.data.length = this.maxSize;
    }
  }

  public outStack = (): T | undefined => {
    return this.data.shift();
  }


}