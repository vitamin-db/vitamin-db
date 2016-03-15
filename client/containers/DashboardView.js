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

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 
 // <PatientGrid patientInfo={patient} />
const Home = ({doctor, patient}) => {
    return (
      <div className="home-body">
        <DoctorGrid docInfo={doctor} />
    
  
      </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(mock.users)
  return { 
   doctor: mock.Doctor,
   patient: mock.users
   // allergies: mock.users[0].allergies,
   // eyerx: mock.users[0].eyerx,
   // family: mock.users[0].family,
   // insurance: mock.users[0].insurance,
   // pharmacy: mock.users[0].pharmacy,
   // familyhistory: mock.users[0].familyhistory,
   // rx: mock.users[0].rx
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;