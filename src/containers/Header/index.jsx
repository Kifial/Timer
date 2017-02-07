import React from 'react';
import { Link } from 'react-router';

require('./index.scss');

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo"><Link to="/">Timer</Link></div>
          <nav className="header__nav">
            <div className="header__stats"><Link to="/stats">Stats</Link></div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header;