const Signup = (state, action) => {
  // state will be an object with: username, email, phone
  if(state === undefined){
    return state = { username: "username", email: "email", phone: "phone" };
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