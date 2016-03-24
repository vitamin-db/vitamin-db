const Appoint = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.appointments || state;
  	default:
  		return state;
  }
};

module.exports = Appoint;