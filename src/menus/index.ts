import { Editor } from '../editor';
import { MenuConstructorMap, MenuItemConstructor, MenuInstanceMap, MenuItem, MENU_TYPE } from './menuItem/type';
import './index.less';

export class Menus {
  private editor: Editor;
  private menuInstanceMap: Partial<MenuInstanceMap>;

  constructor(editor: Editor) {
    this.editor = editor;
    this.menuInstanceMap = {};
  }

  public init = () => {
    // 读取editor.config的配置
    const config = this.editor.config;
    config.menus?.forEach(menu => this.createMenu(MenuConstructorMap[menu], menu));
    this.addToToolBar();
  }

  private createMenu = (MenuConstructor: MenuItemConstructor, key: MENU_TYPE) => {
    const menu: MenuItem = new MenuConstructor(this.editor);
    this.menuInstanceMap[key] = menu;
    return menu;
  }

  private addToToolBar = () => {
    Object.values(this.menuInstanceMap).forEach(menu => {
      this.editor.toolbarContainer?.append(menu?.$elem!);
    });
  }

  public changeActive(): void {
    Object.values(this.menuInstanceMap).forEach(menu => {
      menu?.changeActive();
    });
  }

}