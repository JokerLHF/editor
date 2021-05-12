
import { Editor } from '../../editor';
import { Bold } from '../bold';
import { Italic } from '../italic';
import { Undo } from '../undo';
import { Redo } from '../redo';
import { Underline } from '../underline';
import { StrikeThrough } from '../strike-through';
import { FontSize } from '../font-size';
import { Head } from '../head';
import { OrderedList } from '../orderedList';
import { UnorderedList } from '../unOrderedList';
import { DomElement } from '../../editor/type';
import { FontSizeConf, fontList, headConf, headList } from './defaultConf';
export interface MenuItem {
  $elem: DomElement;
  is_active: boolean;  // menuActive实现
  handleClick?(e: Event): void;
  changeActive?(): void;
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
  FONT_SIZE = 'font-size',
  HEAD = 'head',
  ORDERED_LIST = 'olList',
  UNORDERED_LIST = 'ulList',
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
  [MENU_TYPE.FONT_SIZE]: FontSize,
  [MENU_TYPE.HEAD]: Head,
  [MENU_TYPE.ORDERED_LIST]: OrderedList,
  [MENU_TYPE.UNORDERED_LIST]: UnorderedList,
}

export interface menusConfig {
  menus: MENU_TYPE[];
  fontSize: FontSizeConf[];
  head: headConf[];
}

export const defaultMenuConfig = {
  menus: Object.keys(MenuConstructorMap) as MENU_TYPE[],
  fontSize: fontList,
  head: headList,
}
