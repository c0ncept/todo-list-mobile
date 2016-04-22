import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Actions} from 'reducer/items';


class NewTodo extends Component {
  constructor() {
    super();
    this.state = {
      mode : 'button'
    }
  }

  setLayout(layout) {
    if (layout === this.state.mode) {
      return;
    }
    this.setState({
      mode : layout
    });
  }

  createTodo() {
    let title = document.getElementById('new-todo-title').value;
    if (title.length > 0) {
      this.props.dispatch(Actions.ADD_TODO(title));
      this.setLayout('button');
    }
  }

  render() {
    return (
      <div className={this.state.mode === 'button' ? 'new-todo' : 'new-todo layout-new-todo'}
        onClick={this.setLayout.bind(this, 'layout')}>
        {this.state.mode === 'button' ?
        <span className="new-todo--icon">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </span> :

        <div className="layout-new-todo--wrapper">
          <i className="fa fa-file" aria-hidden="true"></i>
          <input id="new-todo-title" type="text" placeholder="New todo..." />

          <span className="button" onClick={this.createTodo.bind(this)}>
            Create Todo <i className="fa fa-file-o" aria-hidden="true"></i>
          </span>

          <span className="new-todo--close-icon" onClick={this.setLayout.bind(this, 'button')}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
       }
      </div>
    )
  }
}

export default connect(state => ({state}))(NewTodo);
