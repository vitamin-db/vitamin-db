const React = require('react');
const connect = require('react-redux').connect;

const browserHistory = require('react-router').browserHistory;

const bindActionCreators = require('redux').bindActionCreators;

// components
const apiAction = require('../actionCreators/apiActions');
const stateAction = require('../actionCreators/stateActions');
const DoctorGrid = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid = require('../components/Dashboard/patient/PatientGrid');
const mock = require('../model/mockData');
const Grid = require('react-bootstrap').Grid;
// const _ = require('lodash');

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 
 // <PatientGrid patientInfo={patient} />
const Home = ({addDoc, docApiList, searchDoc, doctor, allergies, eyerx, family, insurance, pharmacy, familyhistory, rx}) => {
  return (
    <div className="home-body">
      <DoctorGrid addDoc={addDoc} docApiList={docApiList} searchDoc={searchDoc} docInfo={doctor} insurance={insurance} pharmacy={pharmacy} />
      <PatientGrid allergies={allergies} eyerx={eyerx} family={family} insurance={insurance} pharmacy={pharmacy} familyhistory={familyhistory} rx={rx} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(mock.allergies)
  return { 
   doctor: state.userinfo.doctors,
   allergies: mock.Allergies,
   eyerx: mock.Eyerx,
   // eyerx: state.userinfo.eyerx,
   family: mock.Family,
   insurance: mock.Insurance,
   pharmacy: mock.Pharmacy,
   familyhistory: mock.Familyhistory,
   rx: mock.Rx,
   patient: mock.users,
   docApiList: state.docapi
// ------------------------------------------------------------------------
   // doctor: mock.Doctor,
   // allergies: mock.Allergies,
   // eyerx: mock.Eyerx,
   // family: mock.Family,
   // insurance: mock.Insurance,
   // pharmacy: mock.Pharmacy,
   // familyhistory: mock.Familyhistory,
   // rx: mock.Rx,
   // patient: mock.users,
   // docApiList: state.docapi
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDoc: (e) => {
      e.preventDefault();
      var firstName = e.target.firstname.value;
      var lastName = e.target.lastname.value;
      var body = {firstname:firstName, lastname:lastName};
      dispatch(apiAction.GetApiDocs(body));
    },
    addDoc: (e) => {
      e.preventDefault();
      var name = e.target.firstname.value + " " + e.target.lastname.value;
      var phone = e.target.phone.value;
      var address = e.target.address.value;
      var type = e.target.specialty.value;
      var portrait = e.target.portrait.value;
      var body = {name: name, phone: phone, address: address, type: type, portrait: portrait};
      // this jsut clears the api list, but in the future it will add the chosen doctor to the database
      dispatch(apiAction.AddMyDoc(body));
    }
  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;