import { defaultMenuConfig, menusConfig } from '../menus/menuItem/type';
import { historyType, historyConfig } from '../history/type';

export type DomElement = HTMLElement | null;

export type ConfigType = {
  menusConfig: menusConfig,
  historyConfig?: historyType;
}

export const defaultEditorConfig: ConfigType = {
  menusConfig: defaultMenuConfig,
  historyConfig,
}