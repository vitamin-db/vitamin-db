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
     
      // {appointment.map((val, count) =>
      //     <tr key={count++}>
      //       <td> {count++} </td>
      //       <td> {val.text} </td>
      //       <td> {val.organization.name} </td>
      //       <td> {val.date} </td>
      //       <td> Current </td>
      //     </tr>
      //      )}


const Schedule = ({appointment, immunization}) => (
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

        <tbody>
        {appointment.map((val, count) =>
          <tr>
             <td>{val.id_doctor}</td>

            {val.appointments.map((item) =>
                 <tr> <td></td><td>{item.date}</td> </tr>
              )} 

          </tr>
        )}

        </tbody>
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