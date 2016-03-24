const Immune = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.immunizations || state;
  	default:
  		return state;
  }
};

module.exports = Immune;