// const React = require('react');

// const Schedule = ({appointment, immunization}) => {
//   	console.log('apt', appointment, 'immune', immunization)
//   	return (
//   		<div>
//   			{appointment.map((val) =>
//   				<p>{val.text}</p>
//   			)}
//   			{immunization.map((val) =>
//   				<p>{val.name}</p>
//   			)}
//   		</div>
//   	)
// }

// module.exports = Schedule;

const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableHeader = require('material-ui/lib/table/table-header');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TextField = require('material-ui/lib/text-field');
const Toggle = require('material-ui/lib/toggle');

const Schedule = ({appointment, immunization}) => (
 <div>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>#</TableHeaderColumn>
        <TableHeaderColumn>Appointment</TableHeaderColumn>
        <TableHeaderColumn>Clinic</TableHeaderColumn>
        <TableHeaderColumn>Next</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader> 

    <TableBody>

 	{appointment.map((val, count) =>
      <TableRow key={count++}>
        <TableRowColumn> {count++} </TableRowColumn>
        <TableRowColumn> {val.text} </TableRowColumn>
        <TableRowColumn> {val.organization.name} </TableRowColumn>
        <TableRowColumn> {val.date} </TableRowColumn>
        <TableRowColumn> Current </TableRowColumn>
      </TableRow>
       )}

    </TableBody>
  </Table>

  <br/>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>#</TableHeaderColumn>
        <TableHeaderColumn>Immunizations</TableHeaderColumn>
        <TableHeaderColumn>Clinic</TableHeaderColumn>
        <TableHeaderColumn>Next</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>

   

    <TableBody>
{immunization.map((val, count) => 
      <TableRow key={count++}>
        <TableRowColumn> {count++}</TableRowColumn>
        <TableRowColumn> {val.name} </TableRowColumn>
        <TableRowColumn> {val.organization.name} </TableRowColumn>
        <TableRowColumn> {val.dates[0]} </TableRowColumn>
        <TableRowColumn> Current </TableRowColumn>
      </TableRow>
        )}

    </TableBody>


  </Table>

  </div>
);

module.exports = Schedule;