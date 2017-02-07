const timerModal = (
  state = {
    inputValue: 'Description...',
    visible: false
  },
  action
) => {
  switch(action.type) {
    case 'HANDLE_TIMER_MODAL_VISIBILITY':
      return Object.assign({}, state, { visible: !state.visible });
    case 'HANDLE_TIMER_MODAL_INPUT':
      return Object.assign({}, state, { inputValue: action.data });
    case 'HANDLE_TIMER_MODAL_SUBMIT':
      return Object.assign({}, state, { inputValue: 'Description...', visible: false });
    default:
      return state;
  }
};

export default timerModal;