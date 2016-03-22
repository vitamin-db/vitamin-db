const Pharmacy = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.pharmacies;
  	default:
  		return state;
  }
};

module.exports = Pharmacy;