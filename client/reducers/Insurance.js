const Insurance = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.insurance;
  	default:
  		return state;
  }
};

module.exports = Insurance;