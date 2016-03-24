const Family = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		var newList = [];
  		for(var i=0; i<action.list.family; i++){
  			if(action.list.family.history.length > 1){
  				newList.push(action.list.family[i]);
  			}
  		}
  		return newList || state;
  	default:
  		return state;
  }
};

module.exports = Family;