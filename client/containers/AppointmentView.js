// require packages
const React       = require('react');
const connect     = require('react-redux').connect;
// components/files
const stateAction = require('../actionCreators/stateActions');
const Schedule    = require('../components/Appointment/Schedule');
const mock        = require('../model/mockData');

const Appointment = ({immunization, appointment}) => {
  return (
    <div>
      <Schedule immunization={immunization} appointment={appointment}/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    immunization: mock.Immunizations,
    appointment: mock.Appointments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	AddInformaton: (e) => {
      e.preventDefault();
      var onAdd = e.target.info.value;
      var body = {info: onAdd}
      dispatch(stateAction.AddInformation(body))
    }
  }
};

var wrappedAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointment);

module.exports = wrappedAppointment;