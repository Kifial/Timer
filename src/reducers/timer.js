import { setTimerTime } from '../actions/timer';
import { setTimer } from '../actions/api';

const timer = (
  state = {
    hidden: false,
    closed: false,
    time: ['00', '00', '00'],
    inProgress: false,
    text: '',
    translate: {
      x: 0,
      y: 0
    }
  },
  action
) => {
  switch(action.type) {
    case 'SET_LOCAL_DATA':
      return Object.assign({}, state, { time: action.data.time });
    case 'SET_LOCAL_DATA_PROGRESS':
      let progress = action.data == 'true';
      return Object.assign({}, state, { inProgress: progress });
    case 'INCREMENT_TIMER':
      let newTime = setTimerTime(state.time);
      let data = {
        time: newTime
      };
      localStorage.setItem('timer', JSON.stringify(data));
      return Object.assign({}, state, { time: newTime });
    case 'HANDLE_TIMER_PROGRESS':
      localStorage.setItem('timerProgress', !state.inProgress);
      return Object.assign({}, state, { inProgress: !state.inProgress });
    case 'HIDE_TIMER':
      return Object.assign({}, state, {
        hidden: !state.hidden,
        translate: {
          x: 0,
          y: 0
        }
      });
    case 'HANDLE_MOVE_TIMER':
      return Object.assign({}, state, {
        translate: {
          x: state.translate.x + action.x,
          y: state.translate.y + action.y
        }
      });
    case 'HANDLE_TIMER_MODAL_SUBMIT':
      setTimer(state.time, action.text, action.date, action.dispatch);
      return Object.assign({}, state, { time: ['00', '00', '00'] });
    default:
      return state;
  }
};

export default timer;