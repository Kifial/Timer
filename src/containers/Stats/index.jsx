import React from 'react';
import { connect } from 'react-redux';
import { getItemsForStats } from '../../actions/api';

const BarChart = require('react-chartjs').Bar;

require('./index.scss');

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.props.getItems('week');
  }
  getData() {
    let data = [];
    for (let item in this.props.chartItems) {
      data.push(this.props.chartItems[item]);
    }
    return data;
  }
  render() {
    let chartData = {
      labels: Object.keys(this.props.chartItems),
      datasets: [{
        label: '# of Hours',
        data: this.getData(),
        fillColor: 'rgba(60,190,90,0.2)',
        strokeColor: 'rgba(60,190,90,1)',
        borderWidth: 1
      }]
    };
    let chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    return (
      <div className="stats">
        <div className="stats__tabs">
          <div className="stats__tab">
            <span
              className={'stats__tab-item ' + (this.props.filter == 'all' ? 'stats__tab-item--active' : '')}
              onClick={() => this.props.getItems('all')}
            >
              All time
            </span>
          </div>
          <div className="stats__tab">
            <span
              className={'stats__tab-item ' + (this.props.filter == 'week' ? 'stats__tab-item--active' : '')}
              onClick={() => this.props.getItems('week')}
            >
              Last 7 days
            </span>
          </div>
          <div className="stats__tab">
            <form className="stats__month-picker">
              <label htmlFor="month">
                <span
                  className={'stats__tab-item ' + (this.props.filter == 'month' ? 'stats__tab-item--active' : '')}
                  onClick={() => this.props.getItems(`${this.props.selectValue}`)}
                >
                  Select month:
                </span>
              </label>
              <select
                name="month"
                className="stats__select"
                value={this.props.selectValue}
                onChange={this.props.handleSelectChange}>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </form>
          </div>
        </div>
        <div className="stats__chart">
          {Object.keys(this.props.chartItems).length ?
            <BarChart data={chartData} options={chartOptions} width="1200" height="600" /> :
            <div className="stats__chart-not-found">There is no items</div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chartItems: state.stats.items,
    selectValue: state.stats.selectValue,
    filter: state.stats.filter
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (filter) => {
      console.log(filter);
      getItemsForStats(filter, dispatch);
    },
    handleSelectChange: (e) => {
      dispatch({
        type: 'HANDLE_STATS_SELECT_CHANGE',
        data: e.target.value
      })
    }
  }
};

Stats = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);

export default Stats;