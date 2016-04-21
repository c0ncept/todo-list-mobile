import React, {Component} from 'react';


export default class NewTodo extends Component {
  constructor() {
    super();
    this.state = {
      mode : 'button'
    }
  }

  toggleMode() {
    this.setState({
      mode : this.state.mode === 'layout' ? '' : 'layout'
    });
  }

  render() {
    return (
      <div className={this.state.mode === 'button' ? 'new-todo' : 'new-todo layout-new-todo'}
        onClick={this.toggleMode.bind(this)}>
        {this.state.mode === 'button' ? <span className="new-todo--icon">+</span> :

        <div className="layout-new-todo--wrapper">
          <h3>New todo</h3>
          <input type="text" placeholder="Todo ..." />

          <span className="button">Create Todo</span>
        </div>
       }
      </div>
    )
  }
}
