const React = require('react');
const connect = require('react-redux').connect;

const Appointment = () => {
  if(!window.localStorage.getItem("token")){
    location.assign('/')
  }
  return (
    <div>
      <h1>Appointment's view</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	
  }
};

var wrappedAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointment);

module.exports = wrappedAppointment;