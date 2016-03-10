const React = require('react');
const connect = require('react-redux').connect;

const Appointment = () => {
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