const Appoint = (state, action) => {
  if(state === undefined){
    return state = [];
  }
  switch(action.type){
  	case 'SETMYINFO':
  		return action.list.appointments || state;
  	case 'ADDAPPOINTMENT':
  		var apptArray = [...state];
        // apptArray.filter((val) => {
        //   if(val.id_doctor === action.appointment.id_user_doctor)
        //     return val.appointments.push(action.appointment);
        // });
        var found = false;
        apptArray.forEach((val) => {
			if(val.id_doctor === action.appointment.id_user_doctor){
            	val.appointments.push(action.appointment);
            	found = true;
        	}
        });
        if(!found){
			var newDoc = {
				appointments: [action.appointment],
				id_doctor: action.appointment.id_user_doctor
			};
			apptArray.push(newDoc);
		}
  		return apptArray;
    case 'REMOVEAPPOINTMENT':
      var removeAppt = [...state];
        for(var key in removeAppt) {
          removeAppt[key].appointments.filter((val) => {
            if(action.id_appointment === val.id_appointment) {
              var found = removeAppt[key].appointments.indexOf(val)
              removeAppt[key].appointments.splice(found, 1)
            }
          })
        }
    return removeAppt;

  	default:
  		return state;
  }
};

module.exports = Appoint;


        // for(var i = 0; i <= removeAppt.appointments.length; i++) {
        //   console.log('inbetween should be ok', removeAppt.appointments)
        //   if(action.id_appointment === removeAppt.appointments[i].id_appointment)
        //     console.log('is this ok', action.id_appointment === removeAppt.appointments[i].id_appointment)
        //     delete removeAppt.appointments[i]
        // }

// Get/Appoint = [{id_doctor: #, appointments: [ {}, {} ] }, ...]

/* POST /appointment/:id_doctor
  Adds an appointment - takes an object in req.body.properties: {date, time}
  Returns the newly created object and a 201 status on success
*/
