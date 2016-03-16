const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const AddButton = require('../common/AddButton');


const EyePanel = ({eyerx}) => {
	// var current = allergies.map((curr) =>  {
	// 	return curr.current;
	// })
	// console.log(current);

	return (
		<Col xs={4} md={4}>
		<Panel collapsible header='Eye Prescription'>
	 		<ListGroup fill>
	 		{eyerx.map((val) => 
				<ListGroupItem className="eye-item">
				   <b>Right: </b>{val.sphere_right + ': ' + val.cylinder_right + ' ' + val.axis_right + ' ' + val.add_right}
				</ListGroupItem>
			)}

			{eyerx.map((val) => 
				<ListGroupItem className="eye-item">
				   <b>Left: </b>{val.sphere_left + ': ' + val.cylinder_left + ' ' + val.axis_left + ' ' + val.add_left}
				</ListGroupItem>
			)}

		 		{AddButton}
	 		</ListGroup>
  	 	</Panel>
  	 	</Col>
	)
}

module.exports = EyePanel;

