const Insurance = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.insurance || state;
  	case 'ADDINS':
  		var newIns = [...state];
  		newIns.push(action.ins);
  		return newIns;
  	case 'REMOVEINS':
      var newRemove = [...state];
      for(var i=0; i<newRemove.length; i++){
        if(newRemove[i].id_insurance === action.id){
          newRemove.splice(i,1);
        }
      }
      return newRemove;
  	default:
  		return state;
  }
};

module.exports = Insurance;