const Immune = (state, action) => {
  console.log('immune', state, action)
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.immunizations || state;
  	case 'ADDIMMUN':
    console.log('immune actions', action.immun)
  		var newImmun = [...state];
  		newImmun.push(action.immun)
  		return newImmun;
  	case 'REMOVEIMMUN':
      var removeImmun = [...state];
      for(var i=0; i<removeImmun.length; i++){
        if(removeImmun[i].id_immun === action.id){
          removeImmun.splice(i,1);
        }
      }
        return removeImmun;
    default:
      return state;
  }
};

module.exports = Immune;