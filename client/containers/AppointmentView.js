// require packages
const React              = require('react');
const connect            = require('react-redux').connect;
// components/files
const Schedule           = require('../components/Appointment/Schedule');
const mock               = require('../model/mockData');
// action files
const stateAction        = require('../actionCreators/stateActions');
const apptAction      = require('../actionCreators/appointmentActions');


const Appointment = ({states, dispatches}) => {
  return (
    <div>
      <Schedule immunization={states.immunization} appointment={states.appointment} addAppt={dispatches.addAppointment}/>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    states: {
      immunization: mock.Immunizations,
      appointment: state.appoint
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      addAppointment: (e) => {
        e.preventDefault();
        var body = {properties:{
          date: e.target.date.value,
          time: e.target.time.value
        }};
        console.log(e.target.date.value)
        dispatch(apptAction.AddAppoint(body))
      },

    }
  };
};

var wrappedAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointment);

module.exports = wrappedAppointment;