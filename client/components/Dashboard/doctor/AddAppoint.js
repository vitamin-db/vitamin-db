const React = require('react');
const DatePicker = require('material-ui/lib/date-picker/date-picker');
const TimePicker = require('material-ui/lib/time-picker/time-picker');
const later = require('later');
var DateTimeField = require('react-bootstrap-datetimepicker');

const AddDate = React.createClass({

  dateChange(date) {
    var newDate = new Date(Math.floor(date))
    console.log('see it', date, newDate)
    console.log('val.id coming thru', this.props.docId)
    this.props.addAppointment(newDate.toDateString(),newDate.toTimeString(), this.props.docId)
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