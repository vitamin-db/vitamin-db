const Allergy = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'GETALLERGY':
  		return action.list;
  	default:
  		return state;
  }
};

module.exports = Allergy;