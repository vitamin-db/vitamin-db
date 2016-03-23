const UserInfo = (state, action) => {
  if(state === undefined){
    return state = {user: {}, doctors: [], eyerx: []};
  }
  switch(action.type){
    case 'SETMYINFO':
        return {
          user: action.list.user, 
          doctors: action.list.doctors,
          eyerx: [action.list.eyerx]
        };
    case 'ADDDOCTOR':
    	var newDoc = {...state};
      newDoc.doctors.push(action.doctor);
      return newDoc;
    case 'REMOVEDOCTOR':
      var newDocList = state.doctors.slice(0);
      for(var i=0; i<newDocList.length; i++){
        if(newDocList[i].id_doctor === action.id){
          newDocList.splice(i,1);
        }
      }
      return {...state, doctors: newDocList};
    case 'CHANGEDOC':
      var docList = state.doctors.slice(0);
      for(var i=0; i<docList.length; i++){
        if(docList[i].id_doctor === action.newDoc.id_doctor){
          docList.splice(i,1);
          docList.push(action.newDoc);
        }
      }
      return {... state, doctors: docList};
    case 'ADDEYE':
      var newEye = {...state};
      newEye.eyerx.push(action.eyerx);
      return newEye; 
    case 'REMOVEEYE':
      var newEyeList = state.eyerx.slice(0);
      for(var i=0; i<newEyeList.length; i++){
        if(newEyeList[i].id_eyerx === action.id){
          newEyeList.splice(i,1);
        }
      }
      return {...state, eyerx: newEyeList};
    case 'SUPERLOGOUT':
      return {user: {username: ""}, doctors: [], eyerx: [{}]};
    default:
      return state;
  }
};

module.exports = UserInfo;