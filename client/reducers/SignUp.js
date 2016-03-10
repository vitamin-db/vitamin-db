const Signup = (state, action) => {
  // state will be an object with: username, email, phone
  // console.log("reducer state", state, action)
  if(state === undefined){
    return state = {};
  }
  switch(action.type){
    case 'SUBMIT':
      return state = {
        username: action.info.username,
        email: action.info.email,
        phone: action.info.phone
      };
    default:
      return state;
  }
};

module.exports = Signup;