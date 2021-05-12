import { DomElement } from "../../editor/type";
import { $ } from '../../utils';

export interface FontSizeConf {
  size: string;
  value: string;
}
export const fontList: FontSizeConf[] = [
  { size: '10px', value: '1', },
  { size: '13px', value: '2', },
  { size: '16px', value: '3', },
  { size: '18px', value: '4', },
  { size: '24px', value: '5', },
  { size: '32px', value: '6', },
  { size: '48px', value: '7', },
];


export interface headConf {
  el: DomElement,
  value: string;
}
export const headList: headConf[] = [
  { el: $('<h1>H1</h1>'), value: '<h1>', },
  { el: $('<h2>H2</h2>'), value: '<h2>', },
  { el: $('<h3>H3</h3>'), value: '<h3>', },
  { el: $('<h4>H4</h4>'), value: '<h4>', },
  { el: $('<h5>H5</h5>'), value: '<h5>', },
  { el: $(`<p>正文</p>`), value: '<p>', },
]