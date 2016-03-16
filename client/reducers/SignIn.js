const Signin = (state, action) => {
  // The es6 state = {} does not work with reactify
  // state will be an object with: username, email, phone
  if(state === undefined){
    return state = { logged: false, token: null };
  }
  switch(action.type){
    case 'SIGNINSUCCESS':
      // the spread operator ( " ...state "), is grabing all the properties of the old state
      // putting it in the new object it's wrapped in
      // then re-assign the old keys to the new values just by setting the old keys to a new value
      return {...state, logged: true, token: action.token}; // This is the same as: Object.assign({}, state, {logged: true, token: action.token})
    case 'SIGNINFAIL':
  	  return {...state, logged: false, token: null};
    default:
      return state;
  }
};

module.exports = Signin;