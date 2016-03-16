// require packages
const React       = require('react');
const connect     = require('react-redux').connect;
// components/files
const stateAction = require('../actionCreators/stateActions');
const SearchBar   = require('../components/Search/SearchBar');
// const AddInformation = require('../reducers/AddInformation');

// look up ways to keep track of time
// alarms, calender, etc.

const Appointment = ({AddInformation}) => {
  return (
    <div>
      <h1>Appointment's view</h1>
      <SearchBar onAdd={AddInformation} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {

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