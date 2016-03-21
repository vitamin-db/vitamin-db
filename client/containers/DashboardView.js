const React              = require('react');
const connect            = require('react-redux').connect;

const browserHistory     = require('react-router').browserHistory;

const bindActionCreators = require('redux').bindActionCreators;

// components
const doctorAction       = require('../actionCreators/doctorActions');
const stateAction        = require('../actionCreators/stateActions');
const eyeAction          = require('../actionCreators/eyeActions');
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
const Home = ({addEye, removeDoc, addDoc, docApiList, searchDoc, doctor, allergies, eyerx, family, insurance, pharmacy, familyhistory, rx}) => {
  return (
    <div className="home-body">
      <DoctorGrid removeDoc={removeDoc} addDoc={addDoc} docApiList={docApiList} searchDoc={searchDoc} docInfo={doctor} insurance={insurance} pharmacy={pharmacy} />
      <PatientGrid addEye={addEye} allergies={allergies} eyerx={eyerx} family={family} insurance={insurance} pharmacy={pharmacy} familyhistory={familyhistory} rx={rx} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(mock.allergies)
  return { 
   doctor: state.userinfo.doctors,
   allergies: mock.Allergies,
   // eyerx: mock.Eyerx,
   eyerx: state.userinfo.eyerx,
   family: mock.Family,
   insurance: mock.Insurance,
   pharmacy: mock.Pharmacy,
   familyhistory: mock.Familyhistory,
   rx: mock.Rx,
   patient: mock.users,
   docApiList: state.docapi
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDoc: (e) => {
      e.preventDefault();
      var firstName = e.target.firstname.value;
      var lastName = e.target.lastname.value;
      var body = {firstname:firstName, lastname:lastName};
      dispatch(doctorAction.GetApiDocs(body));
    },
    addDoc: (e) => {// change this container to a react component later
      e.preventDefault();
      var name = e.target.firstname.value + " " + e.target.lastname.value;
      var phone = e.target.phone.value;
      var address = e.target.address.value;
      var type = e.target.specialty.value;
      var portrait = e.target.portrait.value;
      var body = { properties: {
        name: name, 
        phone: phone, 
        street_address: address, 
        type_usermade: type,
        type: type,
        current: false
      }};
      // this jsut clears the api list, but in the future it will add the chosen doctor to the database
      dispatch(doctorAction.AddMyDoc(body, portrait));
    },
    editDoc: (e) => {
      e.preventDefault();
      // grab info from form(that has yet to be created)
      dispatch(doctorAction.ChangeMyDoc())// pass in doctor id and new info
    },
    removeDoc: (e) => {
      e.preventDefault();
      var id = e.target.docId.value;
      console.log("idididi", id)
      dispatch(doctorAction.RemoveMyDoc(id))
    },
    addEye: (e) => {
      e.preventDefault();
      var sphere_right = e.target.sphere_right.value;
      var cyl_right = e.target.cylinder_right.value;
      var axis_right = e.target.axis_right.value;
      var add_right = e.target.add_right.value;
      var sphere_left = e.target.sphere_left.value;
      var cyl_left = e.target.cylinder_left.value;
      var axis_left = e.target.axis_left.value;
      var add_left = e.target.add_left.value;
      var body = {properties:{
        sphere_right: sphere_right,
        sphere_left: sphere_left,
        cylinder_right: cyl_right,
        cylinder_left: cyl_left,
        axis_right: axis_right,
        axis_left: axis_left,
        add_right: add_right,
        add_left: add_left
      }};
      dispatch(eyeAction.AddEyeRx(body))
    }
  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;