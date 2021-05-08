
import { Compile, Position } from './compile';

export function removeNode(record: Compile, nodeList: NodeList) {
  // 123  =>    123  
  //            |     
  /**
   * 操作：123换行，光标聚焦下一行
   * 1. 换行会先创建div       addNodes为div  previous为123    target为更上一层的父节点       (revokeNodeToRemove)
   * 2. div最前面增加br子节点 addNodes为br  target为中间div                                  (revokeNodeToRemove)
   */
  const { target } = record;
  nodeList.forEach(node => {
    target.removeChild(node);
  });
}


function addBeforeNode(record: Compile, nodeList: NodeList) {
  const { nextSibling, target } = record;
  if (nextSibling) {
    // 123      123         123
    // 456  =>  |      =>   789
    // 789      789
    /*
    * 操作：删除456
    * 1. 删除div最前面的br      target为中间的div                               (parent)
    * 2. 删除div，previous为123 nextSibling为789  removeNodes为中间的div        (before的append)
    */
    nodeList.forEach((node: Node) => {
      target.insertBefore(node, nextSibling);
    });
  } else {

    // 123   =>   123
    // |          4

    /**
     * 操作：光标后增加4
     * 1. 在br前面增加textNode     nextSibling为br    addNodes为textNode         (revokeNodeToRemove)
     * 2. 删除br  target为中间div  previous为123  removeNodes为 br               (before的append)
     * 3. 修改textNode的值，增加4
     */
    nodeList.forEach((node: Node) => {
      target.appendChild(node);
    });
  }
}

function addAfterNode(record: Compile, nodeList: NodeList) {
  const { nextSibling, target } = record;

  // 123  => 456
  // 456

  /**
   * 操作：删除123
   * 1. 删除textNode的123的值                                     (revokeChar)
   * 2. 删除123的div  nextSibling为456  target为更高一层的父节点   (after)
   */
  nodeList.forEach(node => {
    target.insertBefore(node, nextSibling);
  });
}
export function addNode(record: Compile, nodeList: NodeList) {
  const { target, position } = record;

  switch (position) {
    case Position.Before:
      addBeforeNode(record, nodeList);
      return;
    case Position.After:
      addAfterNode(record, nodeList);
      return;
    default:
      nodeList.forEach(node => {
        target.appendChild(node);
      });
      return;
  }
}



// redo

function restoreNode(record: Compile) {
  record.addedNodes.length ? addNode(record, record.addedNodes) : removeNode(record, record.removedNodes);
}

function restoreChar(record: Compile) {
  record.target.textContent = record.newValue;
}

function restoreAttr(record: Compile) {

}

export function restore(res: Compile[]) {
  res.forEach(record => {
    restoreFnsMap[record.type](record);
  });
}

const restoreFnsMap = {
  'childList': restoreNode,
  'characterData': restoreChar,
  'attributes': restoreAttr,
}




// undo
export function revoke(res: Compile[]) {
  res.forEach(record => {
    revokeFnsMap[record.type](record);
  });
}

function revokeNode(record: Compile) {
  record.addedNodes.length ? removeNode(record, record.addedNodes) : addNode(record, record.removedNodes);
}

// 撤销文本节点
function revokeChar(record: Compile) {
  record.target.textContent = record.oldValue;
}

function revokeAttr(record: Compile) {
  console.log('attr');
}

const revokeFnsMap = {
  'childList': revokeNode,
  'characterData': revokeChar,
  'attributes': revokeAttr,
}