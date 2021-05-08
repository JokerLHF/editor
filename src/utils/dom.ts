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


