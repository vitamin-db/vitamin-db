const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Col = require('react-bootstrap').Col;
const AddButton = require('./PatientHelpers/NewAllergy');
const EditButton = require('../../common/EditButton');
const DeleteButton = require('../../common/DeleteButton');

const AllergiesPanel = ({removeAllergy, addAllergy, allergies}) => {

	return (
		<Col xs={12} md={4}>
		<Panel collapsible header='Allergies'>
	 		{allergies[0] && <ListGroup fill>
	 		{allergies.map((val, count) => 
				<ListGroupItem key={count} className="allergies-item card-text">
				   {val.allergen + ' - ' + val.current } 
					
					<div className="btn-group">
						<EditButton />
						<Button onClick={removeAllergy.bind(null, val.id_allergy)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
					</div>
				</ListGroupItem>
			)}
	 		</ListGroup>}
		 	<AddButton addAllergy={addAllergy} />
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = AllergiesPanel;