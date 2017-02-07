export const filterTableItems = (items, search) => {
  let visibleItems = [];
  let searchRegexp = new RegExp(search, 'gi');
  items.forEach((item) => {
    if (item.date.match(searchRegexp) || item.description.match(searchRegexp)) {
      visibleItems.push(item);
    }
  });
  return visibleItems;
};