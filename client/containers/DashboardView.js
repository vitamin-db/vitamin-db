const React = require('react');
const connect = require('react-redux').connect;

const browserHistory = require('react-router').browserHistory;

const bindActionCreators = require('redux').bindActionCreators;

// components
const apiAction = require('../actionCreators/apiActions');
const DoctorGrid = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid = require('../components/Dashboard/patient/PatientGrid');
const mock = require('../model/mockData');
const Grid = require('react-bootstrap').Grid;
const _ = require('lodash');

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 
 // <PatientGrid patientInfo={patient} />
const Home = ({docApiList, addDoc, doctor, allergies, eyerx, family, insurance, pharmacy, familyhistory, rx}) => {
    return (
      <div className="home-body">
        <DoctorGrid docApiList={docApiList} addDoc={addDoc} docInfo={doctor} insurance={insurance} pharmacy={pharmacy} />
        <PatientGrid allergies={allergies} eyerx={eyerx} family={family} insurance={insurance} pharmacy={pharmacy} familyhistory={familyhistory} rx={rx} />
      </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(mock.allergies)
  return { 
   doctor: mock.Doctor,
   allergies: mock.Allergies,
   eyerx: mock.Eyerx,
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
    getDocList: () => {
      apiAction.getDocList()
    },
    addDoc: (e) => {
      e.preventDefault();
      var firstName = e.target.firstname.value;
      var lastName = e.target.lastname.value;
      var body = {firstname:firstName, lastname:lastName};
      dispatch(apiAction.GetDoctor(body));
    }
  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;