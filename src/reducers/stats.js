import { getMonth, setItems } from '../actions/stats';

const stats = (
  state = {
    items: {},
    filter: 'week',
    selectValue: getMonth()
  },
  action
) => {
  switch(action.type) {
    case 'SET_FILTERED_STATS_ITEMS':
      return Object.assign({}, state, { items: action.data, filter: action.filter });
    case 'HANDLE_STATS_SELECT_CHANGE':
      return Object.assign({}, state, { selectValue: action.data });
    default:
      return state;
  }
};

export default stats;