const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const PatientCard = ({ val }) => (
	<Col xs={4} md={4}>
		 <div className="card">
		     <div className="card-header">
			     <Button bsStyle="success" bsSize="small" className="card-button"><Glyphicon glyph='heart' /></Button>
			      <h5 className="card-type">Prescriptions</h5>
		     </div>
		     <div className="card-block">
			     <p className="card-text"><b>1</b> {val.Prescriptions[0] + ', ' + val.Prescriptions[1]}</p>
		     </div>
		</div>
	</Col>
);

module.exports = PatientCard;