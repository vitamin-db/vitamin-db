const DocApi = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
    case 'SETDOCAPI':
    	return action.list || state;
    case 'SUPERLOGOUT':
    case 'CLEARDOCAPI':
      return [];
    default:
      return state;
  }
};

module.exports = DocApi;