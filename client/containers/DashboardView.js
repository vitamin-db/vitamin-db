const React = require('react');
const connect = require('react-redux').connect;

const browserHistory = require('react-router').browserHistory;

const bindActionCreators = require('redux').bindActionCreators;

// components
const DoctorGrid = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid = require('../components/Dashboard/patient/PatientGrid');
const mock = require('../model/mockData');
const Grid = require('react-bootstrap').Grid;
const _ = require('lodash');
const apiAction = require('../actionCreators/apiActions');

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 
 // <PatientGrid patientInfo={patient} />
const Home = ({doctor, allergies, eyerx, family, insurance, pharmacy, familyhistory, rx}) => {
    return (
      <div className="home-body">
        <DoctorGrid docInfo={doctor} insurance={insurance} pharmacy={pharmacy} />
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
   rx: mock.Rx
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDocList: () => {
      apiAction.getDocList()
    }
  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;