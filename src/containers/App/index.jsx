import React from 'react';
import Timer from '../Timer/index.jsx';
import Header from '../Header/index.jsx';
import Footer from '../../components/Footer/index.jsx';
import TimerModal from '../TimerModal/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
        <Timer />
        <TimerModal />
      </div>
    )
  }
}

export default App;