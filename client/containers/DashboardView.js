const React              = require('react');
const connect            = require('react-redux').connect;

const browserHistory     = require('react-router').browserHistory;

const bindActionCreators = require('redux').bindActionCreators;

// components
const allergyAction      = require('../actionCreators/allergyActions');
const doctorAction       = require('../actionCreators/doctorActions');
const stateAction        = require('../actionCreators/stateActions');
const eyeAction          = require('../actionCreators/eyeActions');
const pharmAction        = require('../actionCreators/pharmActions');
const insAction          = require('../actionCreators/insuranceActions');
const DoctorGrid         = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid        = require('../components/Dashboard/patient/PatientGrid');
const mock               = require('../model/mockData');
const Grid               = require('react-bootstrap').Grid;
// const _ = require('lodash');

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 
 // <PatientGrid patientInfo={patient} />
const Home = ({states, dispatches}) => {
  return (
    <div className="home-body">
      <DoctorGrid removePharm={dispatches.removePharm} addPharm={dispatches.addPharm} addIns={dispatches.addIns} removeIns={dispatches.removeIns} editDoc={dispatches.editDoc} removeDoc={dispatches.removeDoc} addDoc={dispatches.addDoc} 
          docApiList={states.docApiList} searchDoc={dispatches.searchDoc} 
        docInfo={states.doctor} insurance={states.insurance} pharmacy={states.pharmacy} />
      <PatientGrid removeAllergy={dispatches.removeAllergy} addAllergy={dispatches.addAllergy} 
          removeEye={dispatches.removeEye} addEye={dispatches.addEye} 
          allergies={states.allergies} eyerx={states.eyerx} family={states.family} 
          insurance={states.insurance} pharmacy={states.pharmacy} familyhistory={states.familyhistory} 
        rx={states.rx} />
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
      docApiList: state.docapi
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
        dispatch(doctorAction.ChangeMyDoc(newInfo))
      },
      removeDoc: (id) => {
        dispatch(doctorAction.RemoveMyDoc(id))
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
      }
    }
  };
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;