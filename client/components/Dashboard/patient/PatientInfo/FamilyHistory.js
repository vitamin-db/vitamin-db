const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const AddButton = require('../../common/AddButton');
const EditButton = require('../../common/EditButton');
const DeleteButton = require('../../common/DeleteButton');

// const FormUI = require('../../common/FormUI');

const FamilyHistPanel = ({familyhistory, family}) => {

	return (
		<Col lg={8} lgOffset={4}>
		<Panel collapsible header='Family History'>
	 		<ListGroup fill>
	 		{familyhistory.map((val, count) =>
				<ListGroupItem key={val.name} className="family-item">
				   {count + ': ' + val.name + '  '+ val.condition}
					
					<div className="btn-group">
						<EditButton />
						<DeleteButton />
					</div>
				</ListGroupItem>
			)}
		 		<AddButton />
	 		</ListGroup>
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = FamilyHistPanel;