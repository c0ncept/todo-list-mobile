
export class Actions {
  static FILTER(data = {}) {
    return {
      type : 'FILTER',
      payload : data
    }
  }
}

const initialState = { };

const reducer = function(state = initialState, action) {
  if (action.type === 'FILTER') {
    return Object.assign({}, action.payload);
  }
  return state;
}


export default reducer;
