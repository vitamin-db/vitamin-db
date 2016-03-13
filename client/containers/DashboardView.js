const React = require('react');
const connect = require('react-redux').connect;
// components
const DoctorGrid = require('../components/Dashboard/doctor/DoctorGrid');
const PatientGrid = require('../components/Dashboard/patient/PatientGrid');
const mock = require('../model/mockData');
const Grid = require('react-bootstrap').Grid;

//Grid
//Row might go in Home instead components
//
// // CONTAINER
// 

const Home = ({doctor, patient}) => {
    return (
      <div className="home-body">
        <DoctorGrid docInfo={doctor} />
        <PatientGrid patientInfo={patient} />
      </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { 
   doctor: mock.Doctor,
   patient: mock.Patient
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