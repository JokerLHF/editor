export enum Position {
  Before = 'before',
  After = 'after',
  Parent = 'parent',
}

export interface Compile extends MutationRecord {
  /* redo需要newValue的原因：比如现在123, 
  * undo：12, undo的mutation记录的target是123这个div，经过revokeChar之后target的值是12， oldValue是12
  * 此时redo需要恢复123，但是target是12。所以每一次saveRecord的时候都需要compile一次，再revokeChar之前保存newValue
  */
  newValue: string;
  position: Position;
}

function compliePosition(data: MutationRecord) {
  return data.previousSibling ? Position.Before :
    data.nextSibling ? Position.After : Position.Parent;
}

export function compile(record: MutationRecord[]): Compile[] {
  return record.map(item => (Object.assign(item, {
    newValue: item.target.textContent || '',
    position: compliePosition(item),
  })));
}