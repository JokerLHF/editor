import { findParentByType, insertAfter, $ } from '../../utils';
import { Editor } from '../../editor';

export function transformToOrderedList(nodeList: Node[], editor: Editor) {
  const nameList = nodeList.map(item => item.nodeName.toUpperCase());
  if (nameList.length < 1) return;

  if (nameList.length > 1 && (nameList.includes('UL') || nameList.includes('OL'))) {
    /**
     * 4. 正文 + 无序 + 有序  => 全部变为无序
     */

    transformOtherToOrderedList(nodeList, editor);
  } else if (nameList.includes('UL')) {
    /* 3. 选区全部是无序列表
    * eg: 无序1 无序2 无序3   选择无序2进行无序操作
    *     无序1 正文 无序1  
    */
    transformULToOrderList(editor);
  } else if (nameList.includes('OL')) {
    /* 
    * 2.选区内容都是有序列表，获取当前所有有序列表。
    * eg: 有序1 有序2 有序3 有序4   2变为无序列表 那么3 4就应该变为1 2  
    *     有序1 无序1 有序1 有序2
    */

    transformOrderedListToText(editor);
  } else {

    // 1.选区内容都是普通内容，直接变为无序列表
    transformTextToOrderedList(nodeList, editor);
  }
}

function transformULToOrderList(editor: Editor) {
  const range = editor.selection.getRange();
  const startLi = findParentByType(range?.startContainer, 'LI');
  const endLi = findParentByType(range?.endContainer, 'LI');
  const closestUl = findParentByType(range?.startContainer, 'UL');

  // endLi之后所有li变为新的ul的子节点
  const ul = $('<ul></ul>')!;
  let next = endLi?.nextSibling;
  while (next) {
    // append之后回删除next，所以指针不正确。所以先clone旧的数据
    const cloneNext = next;
    next = next.nextSibling;
    ul.append(cloneNext);
  }

  //  startLi和endLi变为ol

  const ol = $('<ol></ol>')!;
  startLi && ol.append(startLi);
  startLi !== endLi && (ol.append(endLi!))

  closestUl && insertAfter(ul, closestUl);
  closestUl && insertAfter(ol, closestUl);
}

function transformOtherToOrderedList(nodeList: Node[], editor: Editor) {
  const ol = $('<ol></ol>')!;
  editor.textContainer?.insertBefore(ol, nodeList[0]);
  nodeList.forEach(item => {
    const name = item.nodeName.toUpperCase();
    if (name === 'UL' || name === 'OL') {
      ol.append(...Array.from(item.childNodes));
      editor.textContainer?.removeChild(item);
    } else { // 正文
      const li = $('<li></li>')!;
      li.append(item);
      ol.append(li);
    }
  });
}

function transformTextToOrderedList(nodeList: Node[], editor: Editor) {
  const ol = $('<ol></ol>')!;
  nodeList.forEach((item, index) => {
    const li = $('<li></li>')!;
    // 将ul插在选区第一个前面
    index === 0 && editor.textContainer?.insertBefore(ol, item);
    li.append(item);
    ol.append(li);
  });
}

function transformOrderedListToText(editor: Editor) {
  // 获取当前selection的startContainer, endContainer的最近的li节点
  const range = editor.selection.getRange();
  const startLi = findParentByType(range?.startContainer, 'LI');
  const endLi = findParentByType(range?.endContainer, 'LI');
  const closestOl = findParentByType(range?.startContainer, 'OL');

  // endLi之后所有li变为新的ul的子节点
  const ol = $('<ol></ol>')!;
  let next = endLi?.nextSibling;
  while (next) {
    // append之后回删除next，所以指针不正确。所以先clone旧的数据
    const cloneNext = next;
    next = next.nextSibling;
    ol.append(cloneNext);
  }

  //  startLi和endLi变为正文
  const frag = document.createDocumentFragment();
  frag.append(...Array.from(startLi?.childNodes!));
  startLi && closestOl?.removeChild(startLi);
  if (startLi !== endLi) {
    frag.append(...Array.from(endLi?.childNodes!));
    endLi && closestOl?.removeChild(endLi);
  }
  closestOl && insertAfter(ol, closestOl);
  closestOl && insertAfter(frag, closestOl);

}
