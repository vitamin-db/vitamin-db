const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const AddButton = require('../common/AddButton');

// const header = (
//   	<div>
// 		<Button bsStyle="success" bsSize="xsmall" className="card-button"><Glyphicon glyph='heart' /></Button>
// 		<h5 className="card-type">Prescriptions</h5>
// 	</div>
// )

const AllergiesPanel = ({allergies}) => {
	var current = allergies.map((curr) =>  {
		return curr.current;
	})
	console.log(current);

	return (
		<Col xs={4} md={4}>
		<Panel collapsible header='Allergies'>
	 		<ListGroup fill>
	 		{allergies.map((val) => 
				<ListGroupItem className="allergies-item">
				   {val.current + ': ' + val.allergen}
				</ListGroupItem>
			)}
		 		{AddButton}
	 		</ListGroup>
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = AllergiesPanel;