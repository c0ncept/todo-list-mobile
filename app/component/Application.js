import React, {Component} from 'react';
import {connect} from 'react-redux';


class Application extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}


export default connect((state) => ({state}))(Application);
