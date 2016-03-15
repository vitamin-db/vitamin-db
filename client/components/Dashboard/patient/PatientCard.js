const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Accordion = require('react-bootstrap').Accordion;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const AddInfo = require('./AddInfo');


const PatientCard = ({ val}) => {

return (
   <div>
	<Col xs={4} md={4}>

	 <Panel collapsible defaultExpanded header={header}>
	 	<ListGroup fill>

			<ListGroupItem className="patient-item"><b>1 </b>{val.allergies}</ListGroupItem>
		 		{content}
	 	</ListGroup>
  	 </Panel>

	</Col>
  </div>
 );


};

const header = (
  	<div>
		<Button bsStyle="success" bsSize="xsmall" className="card-button"><Glyphicon glyph='heart' /></Button>
		<h5 className="card-type">Prescriptions</h5>
	</div>
)

const content = (
	<div className="patient-item">
	 	<Button className="patient-button" bsSize="xsmall" ><Glyphicon glyph="plus" /></Button>
	    <h6 className="card-type">Add</h6>
	</div>
)



module.exports = PatientCard;