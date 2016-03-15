const Signin = (state, action) => {
  // state will be an object with: username, email, phone
  if(state === undefined){
    return state = { username: "username", email: "email", phone: "phone" };
  }
  switch(action.type){
    case 'SUBMIT':
      return state = {
      	username: action.username,
      	email: action.email,
      	phone: action.phone
      };
    default:
      return state;
  }
};

module.exports = Signin;