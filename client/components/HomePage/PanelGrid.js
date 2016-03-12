const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const PanelGrid = ({docInfo}) => (
<div className="container-fluid">
  <Grid>
    <Row className="show-grid">

    {docInfo.map((val) => 
      <Col xs={4} md={4}>
         <div className="card">
         <div className="card-header">
         <Button bsStyle="success" bsSize="small" className="card-button"><Glyphicon glyph={val.glyph} /></Button>
          <h5 className="card-type">{val.type}</h5>
         </div>
         <div className="card-block">
         <p className="card-text"><b>Name</b>: {val.name}</p>
         <p className="card-text"><b>Address</b>: {val.street_address}</p>
         <p className="card-text"><b>Phone</b>: {val.phone}</p>
         </div>
        </div>
      </Col>
      )}
      <Col xs={4} md={4}>
      <div className="card">
        <div className="card-header">
          <Button bsStyle="Primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button>
          <h5 className="card-type">Add Doctor</h5>
        </div>
      </div>
      </Col>

    </Row>
  </Grid>
  </div>
);


module.exports = PanelGrid;