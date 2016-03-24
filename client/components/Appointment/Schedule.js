const React = require('react');
// const Table = require('material-ui/lib/table/table');
// const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
// const TableRow = require('material-ui/lib/table/table-row');
// const TableHeader = require('material-ui/lib/table/table-header');
// const TableRowColumn = require('material-ui/lib/table/table-row-column');
// const TableBody = require('material-ui/lib/table/table-body');
// const TableFooter = require('material-ui/lib/table/table-footer');
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;
const TextField = require('material-ui/lib/text-field');
const Toggle = require('material-ui/lib/toggle');
const Button = require('react-bootstrap').Button;
     
      // {appointment.map((val, count) =>
      //     <tr key={count++}>
      //       <td> {count++} </td>
      //       <td> {val.text} </td>
      //       <td> {val.organization.name} </td>
      //       <td> {val.date} </td>
      //       <td> Current </td>
      //     </tr>
      //      )}


 //    </tbody>

 // {appointment.map((val, count) =>
 //        <tbody key={count++}>

 //          {val.appointments.map((item) =>
 //            <tr key={count++}>
 //                <td>{item.date}</td> 
 //                <td><Button onClick={removeAppt.bind(null, item.id_appointment)}>X</Button></td>
 //          </tr>
 //          )} 

 //        </tbody>
 //        )}

const Schedule = React.createClass({

  render: function() {
    //super loop just so we can match appointment with doctor name
    {this.props.appointment.map((appt) => {
      for(var i = 0; i < appt.length; i++) {
        for(var j = 0; j < this.props.doctor.length; j++) {
          if(this.props.doctor[j].id_doctor === appt[i].id_user_doctor) {
              appt[i] = Object.assign(appt[i], this.props.doctor[j])
            }
          }
        }
      }
    )}

    return(
    <Col xs={12} md={12} className="scheduleContainer">
      <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
      <h1>My Appointments</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Appointment</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead> 


        {this.props.appointment.map((val, count) =>
            <tbody key={count++}>

              {val.map((item) =>
                <tr key={count++}>
                    <td>{item.name}</td> 
                    <td>{item.type}</td> 
                    <td>{item.date}</td> 
                    <td>{item.time}</td> 
                    <td><Button onClick={this.props.removeAppt.bind(null, item.id_appointment)}>X</Button></td>
              </tr>
              )} 
            </tbody>
        )}


        </Table>
      </Col>


      <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
      <h1>My Immunizations</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Immunizations</th>
              <th>Clinic</th>
              <th>Next</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
      {this.props.immunization.map((val, count) => 
            <tr key={count++}>
              <td> {count++}</td>
              <td> {val.name} </td>
              <td> {val.organization.name} </td>
              <td> {val.dates[0]} </td>
              <td> Current </td>
            </tr>
              )}

          </tbody>
        </Table>
      </Col>
    </Col>
    )
  }
});

module.exports = Schedule;