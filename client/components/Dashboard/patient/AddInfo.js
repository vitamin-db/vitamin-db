const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const AddInfo = () => (
      <Col xs={4} md={4}>
	      <div className="card">
	        <div className="card-header">
	          <Button bsStyle="primary" bsSize="small" onClick={this.open}><Glyphicon glyph="plus" /></Button>
	          <h5 className="card-type">Add</h5>
	        </div>
	      </div>
      </Col>
);

module.exports = AddInfo;