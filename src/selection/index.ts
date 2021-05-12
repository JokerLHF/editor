import { Editor } from '../editor/index';
import { getSelectionRange } from '../utils';

export class Selection {
  private editor: Editor;
  private currentRange: Range | null = null
  constructor(editor: Editor) {
    this.editor = editor;
    this.listenSaveRange();
  }

  public getRange = () => {
    return this.currentRange;
  }

  private listenSaveRange() {
    const editor = this.editor
    const $textContainer = editor.textContainer;

    // 监听鼠标实时保存选区
    $textContainer?.addEventListener('mouseup', () => {
      editor.selection.saveRange();

      // 根据选区的状态更新菜单的状态
      editor.menus.changeActive();
    });
  }

  /**
   * 保存选区，选区必须在富文本内才保存
   */
  public saveRange = (_range?: Range) => {
    if (_range) {
      this.currentRange = _range;
      return;
    }

    const range = getSelectionRange();

    if (!range) return;

    const $containerNode = this.getSelectionContainerNode(range);
    if ($containerNode && this.editor.textContainer?.contains($containerNode)) {
      this.currentRange = range;
    }
  }

  /**
   * 删除旧选区，重置为currentRange最新选区
   */
  public restoreSelection = () => {
    const selection = window.getSelection();
    const range = this.currentRange;
    if (selection && range) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * 闪烁选区：保存最新的选区，删除选区，设置最新选区
   */
  public toggleSelection() {
    this.saveRange();
    this.restoreSelection();
  }

  // 返回完整包含 startContainer 和 endContainer 的、最深一级的节点。
  public getSelectionContainerNode(range?: Range): Node | null {
    const r = range || this.currentRange;
    let elem: Node | null = null;
    if (r) {
      const el = r.commonAncestorContainer;
      elem = el.nodeType === 1 ? el : el.parentNode;
    }

    return elem;
  }

  /**
  * 获取选区节点在编辑器中的最顶层节点
  */
  public getTopNode(el: Node | null): Node | null {
    while (el) {
      const parent = el.parentNode;
      if (this.editor.textContainer?.isEqualNode(parent)) {
        return el;
      }
      el = parent;
    }
    return null;
  }

  // 获取开始节点到结束节点中间的所有节点
  public recordSelectionNodes(startNode: Node | null, endTopNode: Node | null) {
    const nodeList: Node[] = [];
    startNode && nodeList.push(startNode);
    if (startNode === endTopNode) return nodeList;

    while (startNode) {
      const next = startNode.nextSibling;
      if (next && !next.isEqualNode(endTopNode)) {
        nodeList.push(next);
      }
      startNode = next;
    }

    endTopNode && nodeList.push(endTopNode);

    return nodeList;
  }

  public getSelectionRangeTopNodes() {
    const startContainer = this.currentRange?.startContainer || null,
      endContainer = this.currentRange?.endContainer || null;

    const startTopNode = this.getTopNode(startContainer),
      endTopNode = this.getTopNode(endContainer);
    return this.recordSelectionNodes(startTopNode, endTopNode);
  }

}