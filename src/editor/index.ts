import { Menus } from '../menus/index';
import { Layout } from '../Layout';
import { Selection } from '../selection/index';
import { Command } from '../command';
import { History } from '../history';
import { DomElement, ConfigType, defaultEditorConfig } from './type';
import './editor.less';

export class Editor {

  public editorContainer: DomElement;
  public toolbarContainer: DomElement;
  public textContainer: DomElement;
  public menus: Menus;
  public layout: Layout;
  public selection: Selection;
  public command: Command;
  public config: ConfigType
  public history: History;

  constructor(editorContainer: DomElement) {
    this.editorContainer = editorContainer;
    this.toolbarContainer = null;
    this.textContainer = null;
    this.config = defaultEditorConfig;

    this.layout = new Layout(this);
    this.menus = new Menus(this);
    this.selection = new Selection(this);
    this.command = new Command(this);
    this.history = new History(this);
  }


  public create = () => {
    this.menus.init();
  }
}
