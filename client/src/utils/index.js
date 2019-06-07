export function getNonDeletedItems(items) {
  return items.filter(item => !item.__deleted);
}

export function pushToModalRoute(history, pathname) {
  history.push({
    pathname,
    state: {
      modal: true
    }
  });
}
