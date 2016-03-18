const React = require('react');
const DatePicker = require('material-ui/lib/date-picker/date-picker');

// const SchedulePicker = () => (
//   <div className="picker">
//     <DatePicker hintText="Schedule Appointment" />
//   </div>
//  );



const SchedulePicker = React.createClass ({
render() {
  return(
	  <div className="picker">
	    <DatePicker hintText="Schedule Appointment" />
	  </div>
	)
  }
})

module.exports = SchedulePicker;
