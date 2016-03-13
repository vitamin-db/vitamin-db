const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const DocCard = require('./DoctorCard');
const AddDoc = require('./AddDoctor');

const DoctorGrid = ({docInfo}) => (
<div className="container-fluid">
  <Grid>
    <Row className="show-grid">
      {docInfo.map((val) => 
        <DocCard key={val.name} val={val} />
      )}
      <AddDoc />
    </Row>
  </Grid>
  </div>
);


module.exports = DoctorGrid;