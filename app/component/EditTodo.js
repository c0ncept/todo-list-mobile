import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'reducer/items';


class EditTodo extends Component {

  clearEditable() {
    this.props.setEditable(null);
  }

  removeTodo() {
    this.props.dispatch(Actions.DELETE_TODO(this.props.todo.id));
    this.clearEditable();
  }

  saveTodo() {
    let title = document.getElementById('edit-todo-title').value;
    if (title.length > 0) {
      this.props.dispatch(Actions.EDIT_TODO(this.props.todo.id, title));
      this.clearEditable();
    }
  }

  render() {
    let layoutClass =
      this.props.todo === null ? 'edit-todo--wrapper' : 'edit-todo--wrapper edit-todo--layout';

    return (
      <div className={layoutClass}>
       {this.props.todo === null ? '' :
        <div className="edit-todo--content">

          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>

          <input id="edit-todo-title" type="text" placeholder="Edit todo..." defaultValue={this.props.todo.title} />

          <span className="button" onClick={this.saveTodo.bind(this)}>
          Save Todo <i className="fa fa-floppy-o" aria-hidden="true"></i>
          </span>
          <br />

          <span className="button" onClick={this.removeTodo.bind(this)}>
          Remove Todo <i className="fa fa-times" aria-hidden="true"></i>
          </span>

          <span className="edit-todo--close-icon" onClick={this.clearEditable.bind(this)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>
      }
      </div>
    )
  }
}

export default connect(state => ({state}))(EditTodo);
