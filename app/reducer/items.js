
export class Actions {
  static ADD_TODO(title = '', completed=false) {
    return {
      type : 'ADD_TODO',
      payload : {title,completed}
    }
  }

  static EDIT_TODO(id = null, title = '') {
    return {
      type : 'EDIT_TODO',
      payload: {id, title}
    }
  }

  static TOGGLE_TODO(id = null) {
    return {
      type : 'TOGGLE_TODO',
      payload : {id}
    }
  }

  static DELETE_TODO(id = null) {
    return {
      type : 'DELETE_TODO',
      payload : {id}
    }
  }

  static SELECT_ALL(completed=false) {
    return {
      type : 'SELECT_ALL',
      payload : {completed}
    }
  }

  static CLEAR_COMPLETED() {
    return {
      type : 'CLEAR_COMPLETED',
      payload: {}
    }
  }
}

const initalState = [
{
  id : 7,
  title : 'Custom global controls',
  completed : false
},
{
  id : 6,
  title : 'Editable item behavior',
  completed : false
},
{
  id : 5,
  title : 'New item creation support',
  completed : false
},
{
  id : 4,
  title : 'Scollable items layout',
  completed : false
},
{
  id : 3,
  title : 'Conceptual tasks filters',
  completed : true
},
{
  id : 2,
  title : 'Conceptual tasks navigation',
  completed: false
},
{
  id : 1,
  title : 'Create conceptual mobile design',
  completed : true
}
];

const reducer = function(state = initalState, action) {
  function lastId(state) {
    return state.reduce((p,c) => {return c.id > p ? c.id : p; }, 0)
  }

  if (action.type === 'SELECT_ALL') {
    return state.map(s => {
      s.completed = action.payload.completed;
      return s;
    });
  }

  if (action.type === 'CLEAR_COMPLETED') {
    return state.filter(s => s.completed === false);
  }


  if (action.type === 'ADD_TODO') {
    let todo = action.payload;
    todo.id = lastId(state)  + 1;

    return [...[todo],...state];
  }

  if (action.type === 'EDIT_TODO') {
    return state.map( s => {
      if (s.id === action.payload.id) {
        s.title = action.payload.title;
      }
      return s;
    });
  }

  if (action.type === 'TOGGLE_TODO') {
    return state.map( s => {
      if (s.id === action.payload.id) {
        s.completed = !s.completed;
      }
      return s;
    });
  }

  if (action.type === 'DELETE_TODO') {
    return state.filter(s => s.id !== action.payload.id);
  }

  return state;
}

export default reducer;
