import React, {Component} from 'react';
import {connect} from 'react-redux';

import MobileNav from 'component/MobileNav';
import ItemsList from 'component/ItemsList';


class Application extends Component {
  render() {
    return (
      <div className="mobile-wrapper">
        <div className="mobile-container">
          <div className="mobile-content">
            <MobileNav />
            <ItemsList />
          </div>
        </div>
      </div>
    )
  }
}


export default connect((state) => ({state}))(Application);
