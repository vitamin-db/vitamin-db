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
    case 'SUPERLOGOUT':
      return {user: {username: ""}, doctors: []};
    default:
      return state;
  }
};

module.exports = UserInfo;