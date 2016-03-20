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

const Schedule = ({immunization}) => (
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

    {immunization.map((val, count) => 

    <TableBody key={val.id}>

      <TableRow>
        <TableRowColumn> {count++} </TableRowColumn>
        <TableRowColumn> {val.name} </TableRowColumn>
        <TableRowColumn> {val.organization.name} </TableRowColumn>
        <TableRowColumn> {val.dates[0]} </TableRowColumn>
        <TableRowColumn> true </TableRowColumn>
      </TableRow>

      <TableRow>
        <TableRowColumn>{count++}</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>{count++}</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>{count++}</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
        <TableRowColumn>fill me in</TableRowColumn>
      </TableRow>

    </TableBody>
       )}

  </Table>
);

module.exports = Schedule;