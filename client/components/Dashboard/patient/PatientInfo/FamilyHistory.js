const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const AddButton = require('./PatientHelpers/NewFamily');
const EditButton = require('../../common/EditButton');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;


// const FormUI = require('../../common/FormUI');

const FamilyHistPanel = ({removeFamCond, addFamCond, familyhistory, family}) => {

	return (
		<Col xs={12} lg={8} lgOffset={4}>
		<Panel collapsible header='Family History'>
	 		{familyhistory[0] && <ListGroup fill>
	 		{familyhistory.map((val, count) =>
				<ListGroupItem key={count} className="family-item card-text">
				{count + ': ' + val.name + '  '+ val.history[0].condition}
					
					<div className="btn-group">
						<EditButton />
						<Button onClick={removeFamCond.bind(null, val.history[0].id_familymember)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
					</div>
				</ListGroupItem>
			)}
	 		</ListGroup>}
		 	<AddButton addFamCond={addFamCond} />
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = FamilyHistPanel;