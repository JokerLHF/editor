export function getSelectionRange() {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  return range;
}