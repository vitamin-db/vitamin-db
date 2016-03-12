const Signin = (state, action) => {
  // state will be an object with: username, email, phone
  if(state === undefined){
    return state = {};
  }
  switch(action.type){
    case 'SIGNINSUCCESS':
      return state = {
      	logged: true,
      	token: action.token
      };
    case 'SIGNINFAIL':
  	  return state = {
  	  	logged: false
  	  };
    default:
      return state;
  }
};

module.exports = Signin;