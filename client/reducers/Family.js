const Family = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.family;
  	default:
  		return state;
  }
};

module.exports = Family;