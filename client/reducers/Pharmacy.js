const Pharmacy = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.pharmacies || state;
  	case 'ADDPHARM':
  		var newPharm = [...state];
  		newPharm.push(action.pharm);
  		return newPharm;
  	case 'REMOVEPHARM':
      var newRemove = [...state];
      for(var i=0; i<newRemove.length; i++){
        if(newRemove[i].id_pharmacy === action.id){
          newRemove.splice(i,1);
        }
      }
      return newRemove;
    // case 'EDITPHARM':
    //   var newChange = [...state];
    //   for(var i=0; i<newChange.length; i++){
    //     if(newChange[i].id === action.id){
    //       newChange[i] = action.info;
    //     }
    //   }
    //   return newChange;
  	default:
  		return state;
  }
};

module.exports = Pharmacy;