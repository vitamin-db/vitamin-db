const UserInfo = (state, action) => {
  if(state === undefined){
    return state = {user: {username: ""}, doctors: []};
  }
  switch(action.type){
    case 'SETMYINFO':
    	return {user: action.info.user, doctors: action.info.doctors};
    case 'ADDDOCTOR':
    	return {...state, doctors: action.list};
    case 'SUPERLOGOUT':
      return {user: {username: ""}, doctors: []};
    default:
      return state;
  }
};

module.exports = UserInfo;