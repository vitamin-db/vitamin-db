const React = require('react');
// const DatePicker = require('material-ui/lib/date-picker/date-picker');
// const TimePicker = require('material-ui/lib/time-picker/time-picker');
const moment = require('moment');
var DateTimeField = require('react-bootstrap-datetimepicker');


const AddDate = React.createClass({

  dateChange(date) {
    var newDate = new Date(Math.floor(date))
    var min = newDate.getMinutes();

    function minutes() {
      if( min < 10) { 
        return '0' + min
      } else { 
       return min
      }
    };

    var time = newDate.getHours() + ':' + minutes();
    this.props.addAppointment(newDate.toDateString(), time, this.props.docId)
  },

  render() {
    return (
      <div>
        <DateTimeField 
          name="time"
          defaultText="Schedule Appointment"
          onChange={this.dateChange}
          required
        />
      </div>
    );
  }
});

module.exports = AddDate;