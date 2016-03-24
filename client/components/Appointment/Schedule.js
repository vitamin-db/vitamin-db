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


const Schedule = ({appointment, immunization, removeAppt}) => (
  <Col xs={12} md={12} className="scheduleContainer">
    <Col xs={12} md={10} mdOffset={1} className="scheduleContent">
    <h1>My Appointments</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Appointment</th>
            <th>Clinic</th>
            <th>Next</th>
            <th>Status</th>
          </tr>
        </thead> 

 {appointment.map((val, count) =>
        <tbody key={count++}>

          {val.appointments.map((item) =>
            <tr key={count++}>
                <td>{item.id_user_doctor}</td>
                <td>{item.date}</td> 
                <td><Button onClick={removeAppt.bind(null, item.id_appointment)}>X</Button></td>
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
    {immunization.map((val, count) => 
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
);

module.exports = Schedule;