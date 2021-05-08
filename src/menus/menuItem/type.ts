
import { Editor } from '../../editor';
import { Bold } from '../bold';
import { Italic } from '../italic';
import { Undo } from '../undo';
import { Redo } from '../redo';
import { Underline } from '../underline';
import { StrikeThrough } from '../strike-through';

import { DomElement } from '../../editor/type';

export interface MenuItem {
  $elem: DomElement;
  is_active: boolean;  // menuActive实现
  handleClick(e: Event): void;
  changeActive(): void;
}
export interface MenuItemConstructor {
  new(e: Editor): MenuItem;
  // key: string; // 静态属性
}

export enum MENU_TYPE {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDO = 'undo',
  REDO = 'redo',
  UNDER_LINE = 'underline',
  STRIKE_THROUGH = 'strike-through',
}

export type MenuInstanceMap = {
  [key in MENU_TYPE]: MenuItem;
};

export type MenuTypeMap = {
  [key in MENU_TYPE]: MenuItemConstructor;
};

export const MenuConstructorMap: MenuTypeMap = {
  [MENU_TYPE.BOLD]: Bold,
  [MENU_TYPE.ITALIC]: Italic,
  [MENU_TYPE.UNDO]: Undo,
  [MENU_TYPE.REDO]: Redo,
  [MENU_TYPE.UNDER_LINE]: Underline,
  [MENU_TYPE.STRIKE_THROUGH]: StrikeThrough,
}

export const defaultMenuConfig = Object.keys(MenuConstructorMap) as MENU_TYPE[];
