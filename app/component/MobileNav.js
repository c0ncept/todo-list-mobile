import React, {Component} from 'react';
import pad from 'utils/pad';


let interval = null;

class MobileNav extends Component {
  constructor() {
    super();
    this.state = { date : '00:00' };
  }

  updateTime() {
    let date = new Date();
    let hour = pad(date.getHours());
    let min  = pad (date.getMinutes());
    let delim = date.getSeconds() % 2 === 0 ? ' ' : ':';

    this.setState({
      date : `${hour}${delim}${min}`
    });
  }

  componentDidMount() {
    clearInterval(interval);
    this.updateTime();
    interval = setInterval(this.updateTime.bind(this), 1000);
  }

  render() {
    return (
      <div className="mobile_nav">
        <div className="mobile_nav--left">
          <span className="mobile_nav--dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
          </span>
        </div>
        <div className="mobile_nav--center">
          {this.state.date}
        </div>

        <div className="mobile_nav--right">
          <small>80%</small> <i className="fa fa-battery-three-quarters" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default MobileNav;
