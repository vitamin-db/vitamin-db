const React              = require('react');
const connect            = require('react-redux').connect;

const browserHistory     = require('react-router').browserHistory;
const bindActionCreators = require('redux').bindActionCreators;
const mock               = require('../model/mockData');
const Grid               = require('react-bootstrap').Grid;

// components
const DoctorGrid         = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid        = require('../components/Dashboard/patient/PatientGrid');

// actions
const allergyAction      = require('../actionCreators/allergyActions');
const doctorAction       = require('../actionCreators/doctorActions');
const stateAction        = require('../actionCreators/stateActions');
const eyeAction          = require('../actionCreators/eyeActions');
const famAction          = require('../actionCreators/familyActions');
const pharmAction        = require('../actionCreators/pharmActions');
const insAction          = require('../actionCreators/insuranceActions');
const apptAction         = require('../actionCreators/appointmentActions');



const Home = ({states, dispatches}) => {
  return (
    <div className="home-body">
      <DoctorGrid editPharm={dispatches.editPharm} addMyDoc={dispatches.addMyDoc} addAppointment={dispatches.addAppointment} removePharm={dispatches.removePharm} 
        addPharm={dispatches.addPharm} addIns={dispatches.addIns} removeIns={dispatches.removeIns} editDoc={dispatches.editDoc} 
        removeDoc={dispatches.removeDoc} addDoc={dispatches.addDoc} docApiList={states.docApiList} searchDoc={dispatches.searchDoc} 
        docInfo={states.doctor} insurance={states.insurance} pharmacy={states.pharmacy} editIns={dispatches.editIns}/>
      <PatientGrid removeFamCond={dispatches.removeFamCond} addFamCond={dispatches.addFamCond} removeAllergy={dispatches.removeAllergy} 
        addAllergy={dispatches.addAllergy} removeEye={dispatches.removeEye} addEye={dispatches.addEye} 
        allergies={states.allergies} eyerx={states.eyerx} family={states.family}
        insurance={states.insurance} pharmacy={states.pharmacy} familyhistory={states.familyhistory} 
        rx={states.rx} appt={states.appt} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(mock.allergies)
  return {
    states:{ 
      doctor: state.userinfo.doctors,
      allergies: state.allergy,
      eyerx: state.userinfo.eyerx,
      family: state.family,
      insurance: state.insurance,
      pharmacy: state.pharmacy,
      familyhistory: state.family,
      rx: state.rx,
      docApiList: state.docapi,
      appt: state.appoint
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches:{
      searchDoc: (e) => {
        e.preventDefault();
        var firstName = e.target.firstname.value;
        var lastName = e.target.lastname.value;
        var body = {firstname:firstName, lastname:lastName};
        dispatch(doctorAction.GetApiDocs(body));
      },
      addDoc: (doc) => {
        var portrait = doc.portrait;
        var body = { properties: {
          name: doc.firstname + " " + doc.lastname, 
          phone: doc.phone, 
          street_address: doc.address, 
          type_usermade: doc.specialty,
          type: doc.specialty,
          current: false
        }};
        // this jsut clears the api list, but in the future it will add the chosen doctor to the database
        dispatch(doctorAction.AddMyDoc(body, portrait));
      },
      addMyDoc: (e) => {
        e.preventDefault();
        var portrait = "https://asset1.betterdoctor.com/assets/general_doctor_male.png";
        var body = {
          properties: {
            name: e.target.name.value,
            phone: e.target.phone.value,
            street_address: e.target.address.value,
            type_usermade: e.target.specialty.value,
            type: e.target.specialty.value
          }
        };
        dispatch(doctorAction.AddMyDoc(body, portrait));
      },
      editDoc: (id, e) => {
        e.preventDefault();
        var specialty = e.target.specialty.value;
        var name = e.target.name.value;
        var address = e.target.address.value;
        var phone = e.target.phone.value;
        var newInfo = {
          properties: {
            id_doctor: id
          }
        };
        if(name){
          newInfo.properties.name = name;
        }
        if(address){
          newInfo.properties.address = address;
        }
        if(phone){
          newInfo.properties.phone = phone;
        }
        if(specialty){
          newInfo.properties.type = specialty;
        }
        dispatch(doctorAction.ChangeMyDoc(newInfo));
      },
      removeDoc: (id) => {
        dispatch(doctorAction.RemoveMyDoc(id));
      },
      addEye: (e) => {
        e.preventDefault();
        var body = {properties:{
          sphere_right: e.target.sphere_right.value,
          sphere_left: e.target.sphere_left.value,
          cylinder_right: e.target.cylinder_right.value,
          cylinder_left: e.target.cylinder_left.value,
          axis_right: e.target.axis_right.value,
          axis_left: e.target.axis_left.value,
          add_right: e.target.add_right.value,
          add_left: e.target.add_left.value
        }};
        dispatch(eyeAction.AddEyeRx(body))
      },
      removeEye: (id) => {
        dispatch(eyeAction.RemoveEyeRx(id))
      },
      addAllergy: (e) => {
        e.preventDefault();
        var body = {
          properties: {
            allergen: e.target.allergen.value,
            current: e.target.currently.checked
          }
        };
        dispatch(allergyAction.AddAllergy(body));
      },
      removeAllergy: (id) => {
        dispatch(allergyAction.RemoveAllergy(id));
      },
      removeIns: (id) => {
        dispatch(insAction.RemoveIns(id));
      },
      addIns: (e) => {
        e.preventDefault();
        var body = {
          properties: {
            plan_name: e.target.provider.value,
            plan_id: e.target.plan.value,
            group_id: e.target.groupid.value,
            rx_bin: e.target.memberid.value
          }
        };
        console.log("add ins body", body);
        dispatch(insAction.AddIns(body));
      },
      addPharm: (e) => {
        e.preventDefault();
        var body = {
          properties: {
            business_name: e.target.pharmacy.value,
            address: e.target.address.value,
            phone: e.target.phone.value,
            current: e.target.current.checked
          }
        };
        console.log("add pharm body", body);
        dispatch(pharmAction.AddPharm(body));
      },
      removePharm: (id) => {
        dispatch(pharmAction.RemovePharm(id));
      },
      addFamCond: (e) => {
        e.preventDefault();
        var member = {
          properties:{name: e.target.member.value}
        };
        var condition = e.target.condition.value;
        famAction.AddMember(member)
          .then((obj) => {
            var body = {
              properties: {
               condition: condition,
               id_familymember: obj.id
              }
            };
            dispatch(famAction.AddFam(body, obj.name));
          })
      },
      removeFamCond: (id) => {
        dispatch(famAction.RemoveFam(id));
      },
      addAppointment: (date, time, id) => {
        var body = {
          properties: {
            date: date,
            time: time
          }
        };
        dispatch(apptAction.AddAppointment(body, id))
      },
      editIns: (id, e) => {
        e.preventDefault();
        var planname = e.target.planname.value;
        var planid = e.target.planid.value;
        var groupid = e.target.groupid.value;
        var memberid = e.target.memberid.value;
        var body = {
          properties: {
            id_insurance: id
          }
        };
        if(planname){
          body.properties.plan_name = planname;
        }
        if(planid){
          body.properties.plan_id = planid;
        }
        if(groupid){
          body.properties.group_id = groupid;
        }
        if(memberid){
          body.properties.rx_bin = memberid;
        }
        dispatch(insAction.EditIns(body));
      },
      editPharm: (id, e) => {
        e.preventDefault();
        var body = {
          properties: {
            id_pharmacy: id,
            current: e.target.current.checked
          }
        };
        if(e.target.name.value){
          body.properties.business_name = e.target.name.value;
        }
        if(e.target.address.value){
          body.properties.address = e.target.address.value;
        }
        if(e.target.phone.value){
          body.properties.phone = e.target.phone.value;
        }
        dispatch(pharmAction.EditPharm(body))
      }
    }
  };
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;