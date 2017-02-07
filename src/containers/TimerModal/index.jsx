import React from 'react';
import { connect } from 'react-redux';

require('./index.scss');

class TimerModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'timer-modal ' + (this.props.visible ? '' : 'timer-modal--hidden')}>
        <div className="timer-modal__layout" onClick={this.props.handleModalClose}></div>
        <div className="timer-modal__body">
          <div className="timer-modal__title">Type description to logged time (optional)</div>
          <form className="timer-modal__input-box">
          <textarea
            name="modal"
            className="timer-modal__input"
            value={this.props.modalInput}
            onChange={this.props.handleModalInput}
          />
            <div className="timer-modal__submit-box">
              <div
                className="timer-modal__submit"
                onClick={() => this.props.handleModalSubmit(this.props.modalInput)}
              >
                Log time
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modalInput: state.modals.timerModal.inputValue,
    visible: state.modals.timerModal.visible
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleModalClose: () => {
      dispatch({
        type: 'HANDLE_TIMER_MODAL_VISIBILITY'
      });
    },
    handleModalInput: (e) => {
      dispatch({
        type: 'HANDLE_TIMER_MODAL_INPUT',
        data: e.target.value
      });
    },
    handleModalSubmit: (text) => {
      let todaysDate = new Date();
      let day = todaysDate.getDate();
      if (day.toString().length == 1) {
        day = `0${day}`;
      }
      let month = todaysDate.getMonth() + 1;
      if (month.toString().length == 1) {
        month = `0${month}`;
      }
      const year = todaysDate.getFullYear();
      let timerDate = `${day}-${month}-${year}`;
      dispatch({
        type: 'HANDLE_TIMER_MODAL_SUBMIT',
        date: timerDate,
        text,
        dispatch
      });
      let data = {
        time: ['00', '00', '00']
      };
      localStorage.setItem('timer', JSON.stringify(data));
    }
  }
};

TimerModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerModal);

export default TimerModal;