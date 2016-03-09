const counter = (state, action) => {
  console.log("reducer called", state, action)
  // this always sets it to 0 for some reason
  // if(!state){
  //   return state = 0;
  // }
  if(state === undefined){
    return state = 0;
  }
  
  switch (action.type) {
    case 'INCREMENT':
      return state === null ? null : state + 1;
    case 'DECREMENT':
      return state === null ? null : state - 1;
    case 'TOGGLE':
      return state === null ? 0 : null;
    default:
      return state;
  }
};

module.exports = counter;