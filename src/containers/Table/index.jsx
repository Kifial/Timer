import React from 'react';
import { connect } from 'react-redux';
import TableItem from '../../components/TableItem/index.jsx';
import { getTimers, getFilteredItems } from '../../actions/api';
import { Link } from 'react-router';
import Search from '../../components/Search/index.jsx';

require('./index.scss') ;

class Table extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    switch(window.location.pathname) {
      case '/today':
        this.props.handleRouterChange('today');
        break;
      case '/week':
        this.props.handleRouterChange('week');
        break;
      case '/month':
        this.props.handleRouterChange('month');
        break;
      default:
        this.props.handleRouterChange('all');
        break;
    }
  }
  render() {
    return (
      <div className="table">
        <Search
          value={this.props.searchValue}
          handleSearch={this.props.handleSearch}
        />
        <div className="table__filters">
          <div className="table__filter">
            <Link to="/timers/all" onClick={() => this.props.handleRouterChange('all')}>All</Link>
          </div>
          <div className="table__filter">
            <Link to="/timers/today" onClick={() => this.props.handleRouterChange('today')}>Today</Link>
          </div>
          <div className="table__filter">
            <Link to="/timers/week" onClick={() => this.props.handleRouterChange('week')}>Last 7 days</Link>
          </div>
          <div className="table__filter">
            <Link to="/timers/month" onClick={() => this.props.handleRouterChange('month')}>This month</Link>
          </div>
        </div>
        <div className="table__items">
          <div className="table-item">
            <div className="table-item__date table-item__date--head">Date</div>
            <div className="table-item__time table-item__time--head">Logged time</div>
            <div className="table-item__description">Description</div>
          </div>
          {this.props.items.map((item, i) =>
            <TableItem
              key={item.id}
              date={item.date}
              time={item.time}
              description={item.description}
              odd={i % 2 == 0}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
 return {
   items: state.table.visibleItems,
   searchValue: state.table.searchValue
 }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleRouterChange: (route) => {
      getFilteredItems(dispatch, route);
    },
    handleSearch: (e) => {
      dispatch({
        type: 'HANDLE_SEARCH',
        data: e.target.value
      });
    }
  }
};

Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);

export default Table;