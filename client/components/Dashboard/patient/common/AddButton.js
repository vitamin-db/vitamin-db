const React = require('react');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const AddButton = (
	<div className="patient-item">
	 	<Button className="patient-button" bsSize="xsmall" ><Glyphicon glyph="plus" /></Button>
	    <h6 className="card-type">Add</h6>
	</div>
);

module.exports = AddButton;
