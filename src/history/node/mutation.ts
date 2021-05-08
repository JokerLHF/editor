export class Mutation {
  private observer: MutationObserver;

  protected options: MutationObserverInit = {
    subtree: true, // 监视范围扩展至目标节点整个节点树中的所有节点, MutationObserverInit也作用于子节点
    childList: true, // 监视目标节点（如果 subtree 为 true，则包含子孙节点）添加或删除新的子节点
    attributes: true, // 观察受监视元素的属性值变更
    attributeOldValue: true, // 当监视节点的属性改动时，将记录任何有改动的属性的上一个值
    characterData: true, // 目标节点或子节点树中节点所包含的字符数据的变化
    characterDataOldValue: true, // 受监视节点上发生更改时记录节点文本的先前值
  }

  constructor(fn: MutationCallback) {
    this.observer = new MutationObserver(fn);
  }


  // 绑定监听节点
  public observe(node: Node) {
    this.observer.observe(node, this.options);
  }

  // 断开监听器（停止观察）
  public disconnect() {
    this.observer.disconnect()
  }

}