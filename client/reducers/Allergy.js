const Allergy = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'GETALLERGY':
  		return action.list;
  	case 'ADDALLERGY':
  		var newAllergy = [...state];
  		newAllergy.push(action.allergy);
  		return newAllergy;
  	case 'REMOVEALLERGY':
      var newRemove = [...state];
      for(var i=0; i<newRemove.length; i++){
        console.log("remove@@@", newRemove[i].id_allergy, "/", action.id)
        if(newRemove[i].id_allergy === action.id){
          newRemove.splice(i,1);
        }
      }
      return newRemove;
  	default:
  		return state;
  }
};

module.exports = Allergy;