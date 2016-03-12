const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const PatientCard = require('./PatientCard');
const AddInfo = require('./AddInfo');

const PatientGrid = ({patientInfo}) => (
<div className="container-fluid">
  <Grid>
    <Row className="show-grid">
      {patientInfo.map((val) => 
        <PatientCard key={val.Prescriptions} val={val} />
      )}
      <AddInfo />
    </Row>
  </Grid>
  </div>
);


module.exports = PatientGrid;