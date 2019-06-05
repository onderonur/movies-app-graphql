export function getNonDeletedItems(items) {
  return items.filter(item => !item.__deleted);
}
