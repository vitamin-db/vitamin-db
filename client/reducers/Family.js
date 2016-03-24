const Family = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
      console.log("set info reducer", action.list);
      var newList = [];
  		for(var i=0; i<action.list.family.length; i++){
  			if(action.list.family[i].history.length > 0){
  				newList.push(action.list.family[i]);
  			}
  		}
  		return newList || state;
    case 'ADDFAMCOND':
      var newFam = [...state];
      newFam.push(action.fam);
      return newFam;
    case 'REMOVEFAMCOND':
      var newRemove = [...state];
      console.log("remove fam cond", action.id);
      for(var j=0; j<newRemove.length; j++){
        if(newRemove[j].id_familymember === action.id){
          newRemove.splice(j, 1);
        }
      }
      return newRemove;
  	default:
  		return state;
  }
};

module.exports = Family;