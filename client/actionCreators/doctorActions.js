const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

const API_KEY = '842ff30a0065e0c0bdb41fcc26a0343a';

function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for(var i=0; i<ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1);
       if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
   }
   return "";
};

// get doctor list based on user argument: { username: username, token: token }
// commented out until everything is ready
function GetApiDocs (doctor) {
  return (dispatch) => {
    return fetch("https://api.betterdoctor.com/2015-01-27/doctors?first_name=" + doctor.firstname + "&last_name=" + doctor.lastname + "&skip=0&limit=10&user_key=" + API_KEY)
      .then((data) => {
        //console.log "data": [{[{[],{},[{}{}],[{}]}], etc..
        return data.json();
      })
      .then((docList) => {
        // console.log("dat", docList.data)
        var final = [];
        docList.data.forEach((doc) => {
          var city      = doc.practices[0].visit_address.city;
          var state     = doc.practices[0].visit_address.state;
          var street    = doc.practices[0].visit_address.street;
          var street2   = doc.practices[0].visit_address.street2;
          var zip       = doc.practices[0].visit_address.zip;
          final.push({
            firstname: doc.profile.first_name,
            lastname: doc.profile.last_name,
            business: doc.practices[0].name,
            phone: doc.practices[0].phones[0].number,
            address: street + " " + street2 + " " + city + ", " + state + " " + zip,
            portrait: doc.profile.image_url,
            specialty: doc.specialties[0].name
          });
        })
        dispatch(stateAction.SetDocApi(final))
      })
      .catch(function (err) {
        console.error('Doctor api error:', err);
      });
  };
};

function AddMyDoc (doctor, portrait) { // send server the doctor's id/primary key and altered info
  console.log("add my doc", doctor)
  return (dispatch) => {
    return fetch('/doctor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(doctor)
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log("add doc DATA", data)
      dispatch(stateAction.AddDoc(data, portrait));
    })
    .then(() => {
      dispatch(stateAction.ClearDocApi());
    })
    .catch((err) => {
      console.error("add doc error", err)
    })
  };
};

function RemoveMyDoc (id_doctor) { // this will be the doctor's id/primary key
  return (dispatch) => {
    return fetch('/doctor/' + id_doctor, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      }
    })
    .then((response) => {
      console.log("remove doc res", response);
      dispatch(stateAction.RemoveDoc(id_doctor))
    })
    .catch((err) => {
      console.error("removemydoc error", err);
    })
  };
};

function ChangeMyDoc (newInfo) {
  return (dispatch) => {
    return fetch('/doctor', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getCookie("token")
      },
      body: JSON.stringify(newInfo)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("deets", data);
      dispatch(stateAction.ChangeDoc(data));
    })
    .catch((err) => {
      console.error("change doc err", err);
    })
  };
};

module.exports = {
	GetApiDocs,
	AddMyDoc,
	RemoveMyDoc,
	ChangeMyDoc
}