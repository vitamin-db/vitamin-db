const React = require('react');
const later = require('later');
const DateTimeField = require('react-bootstrap-datetimepicker');
const Button = require('react-bootstrap').Button;

const AddDate = React.createClass({
 getInitialState() {
   return {
     date: 0,
     time: 0
   };
 },
 dateChange(date) {
    console.log('date', date)
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
  console.log('our date and time looks like', this.state.date, this.state.time)
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
       <Button onClick={this.submit} defaultText="add date" />
     </div>
   );
 }
});

module.exports = AddDate;