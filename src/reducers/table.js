import { filterTableItems } from '../actions/table';

const table = (
  state = {
    allItems: [],
    visibleItems: [],
    filter: '',
    searchValue: ''
  },
  action
) => {
  var visibleItems;
  var allItems;
  switch(action.type) {
    case 'HANDLE_SEARCH':
      visibleItems = filterTableItems(state.allItems, action.data);
      return Object.assign({}, state, { searchValue: action.data, visibleItems });
    case 'SET_FILTERED_TABLE_TIMERS':
      return Object.assign({}, state, { allItems: action.data, visibleItems: action.data });
    case 'ADD_TABLE_TIMER':
      allItems = [ action.data, ...state.allItems ];
      visibleItems = filterTableItems(allItems, state.searchValue);
      return Object.assign({}, state, { allItems, visibleItems });
    default:
      return state;
  }
};

export default table;