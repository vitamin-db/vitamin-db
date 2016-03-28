// require packages
const React              = require('react');
const connect            = require('react-redux').connect;
// components/files
const Schedule           = require('../components/Appointment/Schedule');
const newImmun           = require('../components/Appointment/newImmun');
const mock               = require('../model/mockData');
// action files
const stateAction        = require('../actionCreators/stateActions');
const apptAction      = require('../actionCreators/appointmentActions');
const immunAction      = require('../actionCreators/immunizationActions');

const Appointment = ({states, dispatches}) => {
  return (
    <div>
      <Schedule immunization={states.immunization} addImmun={dispatches.addImmun} doctor={states.doctor} appointment={states.appointment} removeAppt={dispatches.removeAppt} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    states: {
      doctor: state.userinfo.doctors,
      immunization: state.immun,
      appointment: state.appoint.map((val) => { return val.appointments })
    }
  }
};

    // knex.schema.createTable('immun', function(table) {
    //   table.increments('id_immun').primary()
    //   table.integer('id_user')
    //        .references('id_user')
    //        .inTable('users')
    //   table.string('date')
    //   table.string('type')
    //   table.string('notes')
    // }),


const mapDispatchToProps = (dispatch) => {
  console.log('the dispatches', dispatch)
  return {
      dispatches: {
      addImmun: (e) => {
        console.log('eeee', e.target)
        e.preventDefault();
        var body = {
          properties: {
            date: e.target.date.value,
            type: e.target.type.value,
            notes: e.target.notes.value,
          }
        };
        console.log("add immun body", body);
        dispatch(immunAction.AddImmun(body));
      },
        removeAppt: (id_appointment) => {
          dispatch(apptAction.RemoveAppointment(id_appointment))
        },

      }
    };
};

var wrappedAppointment = connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointment);

module.exports = wrappedAppointment;