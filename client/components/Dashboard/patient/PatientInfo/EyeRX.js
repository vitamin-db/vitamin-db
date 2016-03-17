const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const AddButton = require('../common/AddButton');
const EditButton = require('../common/EditButton');
const DeleteButton = require('../common/DeleteButton');

const EyePanel = ({eyerx}) => {
	// var current = allergies.map((curr) =>  {
	// 	return curr.current;
	// })
	// console.log(current);

	return (
		<Col xs={12} md={8}>
		<Panel collapsible header='Eye Prescription'>
	 		<ListGroup fill>
	 		{eyerx.map((val) => 
				<ListGroupItem key={val.sphere_right} className="eye-item">
				   <b>Right: </b>{val.sphere_right + ': ' + val.cylinder_right + ' ' + val.axis_right + ' ' + val.add_right}
				
					<div className="btn-group">
						<EditButton />
						<DeleteButton />
					</div>	
				</ListGroupItem>
			)}

			{eyerx.map((val) => 
				<ListGroupItem key={val.sphere_left} className="eye-item">
				   <b>Left: </b>{val.sphere_left + ': ' + val.cylinder_left + ' ' + val.axis_left + ' ' + val.add_left}
					
					<div className="btn-group">
						<EditButton />
						<DeleteButton />
					</div>				
				</ListGroupItem>
			)}

		 		{AddButton}
	 		</ListGroup>
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = EyePanel;

