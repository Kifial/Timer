import React from 'react';
import { connect } from 'react-redux';

require('./index.scss');

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimer = this.handleTimer.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.state = {
      isDragged: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem('timer')) {
      let data = JSON.parse(localStorage.getItem('timer'));
      this.props.setLocalData(data);
    }
    if (localStorage.getItem('timerProgress')) {
      let data = localStorage.getItem('timerProgress');
      this.props.setLocalDataProgress(data);
      if (data == 'true') {
        let counter = setInterval(this.props.incrementTimer, 1000);
        this.setState({ counter });
      }
    }
    window.addEventListener('mousemove', this.handleDragMove);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleDragMove);
  }
  handleTimer() {
    if (this.props.inProgress) {
      clearInterval(this.state.counter);
    } else {
      let counter = setInterval(this.props.incrementTimer, 1000);
      this.setState({ counter });
    }
    this.props.handleTimerProgress();
  }
  handleDragStart(e) {
    if (!this.props.hidden) {
      this.setState({
        isDragged: true,
        lastX: e.pageX,
        lastY: e.pageY
      });
    }
  }
  handleDragEnd(e) {
    this.setState({
      isDragged: false
    });
  }
  handleDragMove(e) {
    if (this.state.isDragged) {
      let x = e.pageX;
      let y = e.pageY;
      let translateX = x - this.state.lastX;
      let translateY = y - this.state.lastY;
      this.props.handleMoveTimer(translateX, translateY);
      this.setState({
        lastX: x,
        lastY: y
      });
    }
  }
  render() {
    return (
      <div
        className={
          'timer ' +
          (this.props.hidden ? 'timer--hidden ' : '') +
          (this.state.isDragged ? '' : 'timer--transitioned ')
        }
        style={{
          transform: `translate(${this.props.translate.x}px, ${this.props.translate.y}px)`
        }}
      >
        <div
          className="timer__header"
          onMouseDown={this.handleDragStart}
          onMouseUp={this.handleDragEnd}
        >
          <div
            className="timer__hide"
            onClick={this.props.handleHide}
          ></div>
          <div className="timer__close"></div>
        </div>
        <div className="timer__body">
          <div className="timer__display">{this.props.time.join(':')}</div>
          <div
            className={'timer__button ' + (this.props.inProgress ? 'timer__button--pause' : '')}
            onClick={this.handleTimer}
          ></div>
        </div>
        <div className="timer__log">
          <div
            className="timer__log-button"
            onClick={() => {
              this.props.logTimer();
              this.props.inProgress ? this.handleTimer() : '';
            }}
          >
            Log time
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hidden: state.timer.hidden,
    closed: state.timer.closed,
    time: state.timer.time,
    inProgress: state.timer.inProgress,
    text: state.timer.text,
    translate: state.timer.translate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLocalData: (data) => {
      dispatch({
        type: 'SET_LOCAL_DATA',
        data
      })
    },
    setLocalDataProgress: (data) => {
      dispatch({
        type: 'SET_LOCAL_DATA_PROGRESS',
        data
      })
    },
    incrementTimer: () => {
      dispatch({
        type: 'INCREMENT_TIMER'
      })
    },
    handleTimerProgress: () => {
      dispatch({
        type: 'HANDLE_TIMER_PROGRESS'
      })
    },
    handleHide: (e) => {
      e.stopPropagation();
      dispatch({
        type: 'HIDE_TIMER'
      })
    },
    handleMoveTimer: (x, y) => {
      dispatch({
        type: 'HANDLE_MOVE_TIMER',
        x,
        y
      })
    },
    logTimer: () => {
      dispatch({
        type: 'HANDLE_TIMER_MODAL_VISIBILITY'
      });
    }
  }
};

Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);

export default Timer;