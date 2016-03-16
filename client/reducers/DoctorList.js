const DocList = (state, action) => {
  // state will be an array with object doctors. Expected doctor object data = {username, email, phone}
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
    case 'GETLIST':
    	return action.list; // server will return an array filled with doctor objects, return it and it will be set to the state variable
    case 'ADDLIST':
    	return [...state, action.doctor]; // ask server to return the newly added doctor and make a new array with doctor objects in it
    default:
      return state;
  }
};

module.exports = DocList;