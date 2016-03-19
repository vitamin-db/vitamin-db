const UserInfo = (state, action) => {
  if(state === undefined){
    return state = {user: {username: ""}, doctors: [], eyerx: {}};
  }
  switch(action.type){
    case 'SETMYINFO':
      if(!action.info.user){
        return {...state, user: {username: ""}};
      }else{
        return {
          user: action.info.user, 
          doctors: action.info.doctors, 
          eyerx: action.info.eyerx
        };
      }
    case 'ADDDOCTOR':
    	var newState = {...state};
      newState.doctors.push(action.doctor);
      return newState;
    case 'REMOVEDOCTOR':
      var newList = state.doctors.slice(0);
      for(var i=0; i<newList.length; i++){
        if(JSON.stringify(newList[i].id_doctor) === action.id){
          newList.splice(i,1);
        }
      }
      return {...state, doctors: newList};
    case 'SUPERLOGOUT':
      return {user: {username: ""}, doctors: [], eyerx: {}};
    default:
      return state;
  }
};

module.exports = UserInfo;