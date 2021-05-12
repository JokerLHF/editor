import { DomElement } from '../editor/type';

function _createElemByHTML(html: string): HTMLElement {
  const div = document.createElement('div')
  div.innerHTML = html
  const elems = div.children
  return [].slice.call(elems)[0];
}

export function $(html: string): DomElement {
  if (!html) return null;
  return _createElemByHTML(html);
}

export function findParentByType(node: Node | null | undefined, type: string) {
  while (node) {
    const parent = node.parentNode;
    if (parent?.nodeName.toUpperCase() === type) {
      return parent;
    }
    node = parent;
  }
  return null;
}

export function insertAfter(newNode: Node, existingNode: Node) {
  // 获取现有节点的父元素
  const parent = existingNode.parentNode;

  // 如果父元素中的最后一个子元素 等于 现有的节点
  if (parent?.lastChild === existingNode) {
    // 把现有节点放入父元素子节点后面
    // appendChild在子节点后面追加一个元素
    parent.appendChild(newNode);
  } else {
    // .nextSibling 该属性返回指定节点后的第一个节点
    // insertBefore 第一个参数插入的节点对象，第二参数可选，在其之前插入子节点，如果不传，则在结尾插入。
    parent?.insertBefore(newNode, existingNode.nextSibling);
  }
}