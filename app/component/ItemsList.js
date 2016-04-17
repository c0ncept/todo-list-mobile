import React, {Component} from 'react';
import {connect} from 'react-redux';


import {Actions} from 'reducer/filter';

class ItemsList extends Component {

  filter() {
    this.props.dispatch(Actions.FILTER({completed : true}));
  }

  render() {
    let items = this.props.state.items.filter((i) => {
      return !this.props.state.filter.hasOwnProperty('completed') ||
              this.props.state.filter.completed === i.completed;
    });

    return (
      <div className="items_list">

          <div className="items_list--wrapper">
            <div className="items_list--screen" style={{backgroundColor : 'steelblue'}}>

            </div>
            <div className="items_list--screen" style={{backgroundColor : 'pink'}}>

            </div>
            <div className="items_list--screen" style={{backgroundColor : 'yellow'}}>

            </div>
          </div>

        <div className="items_list--tabs">

        </div>
      </div>
    )
  }
}

export default connect(state => ({state}))(ItemsList);
