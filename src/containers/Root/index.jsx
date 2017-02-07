import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from '../../routes/index.js';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>
    )
  }
}

export default Root;