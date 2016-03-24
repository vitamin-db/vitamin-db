const Appoint = (state, action) => {
  console.log('APPPPOINT', state, 'action', action)
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.appointments || state;
  	case 'ADDAPPOINTMENT': 
  		var appointArray = [...state];
      for(var i = 0; i < appointArray; i++) {
        if(appointArray[i].id_doctor === appointArray[i].appointments[0].id_user_doctor) {
  		    appointArray[i].appointments.push(action.appointment);
        }
        else {
          appointArray[i].appointments.push(action.appointment);
        }
      }
  		return appointArray;
  	default:
  		return state;
  }
};

module.exports = Appoint;

// Get/Appoint = [{id_doctor: #, appointments: [ {}, {} ] }, ...]

/* POST /appointment/:id_doctor
  Adds an appointment - takes an object in req.body.properties: {date, time}
  Returns the newly created object and a 201 status on success
*/
