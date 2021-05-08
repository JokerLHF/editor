import { defaultMenuConfig, MENU_TYPE } from '../menus/menuItem/type';
import { historyType, historyConfig } from '../history/type';

export type DomElement = HTMLElement | null;

export type ConfigType = {
  menus?: MENU_TYPE[];
  historyConfig?: historyType;
}

export const defaultEditorConfig: ConfigType = {
  menus: defaultMenuConfig,
  historyConfig,
}