const DocList = (state, action) => {

  // state will be an array with object doctors. Expected doctor object data = {username, email, phone}

  // state will be an object with: username, email, phone

  if(state === undefined){
    return state = [];
  }
  switch(action.type){

    case 'GETLIST':
    	return action.list; // server will return an array filled with doctor objects, return it and it will be set to the state variable
    case 'ADDLIST':
    	return [...state, action.doctor]; // the server request to add a doctor will return with the new doctors object, we put that in a new array along with all the old doctors

    case 'GETDOCLIST':
      return state = action.list;

    default:
      return state;
  }
};

module.exports = DocList;