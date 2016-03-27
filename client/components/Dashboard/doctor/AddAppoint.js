const React = require('react');
const later = require('later');
const DateTimeField = require('react-bootstrap-datetimepicker');

const AddDate = React.createClass({
 getInitialState() {
   return {
     date: 0,
     time: 0
   };
 },
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

   this.setState({
     date: newDate.toDateString(),
     time: time
   })
 },

 submit() {
   this.props.addAppointment(
     this.state.date,
     this.state.time, 
     this.props.docId
   )
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
       <button onClick={this.submit}>Confirm</button>
     </div>
   );
 }
});

module.exports = AddDate;