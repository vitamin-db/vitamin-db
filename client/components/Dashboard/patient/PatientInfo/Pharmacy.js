const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const AddButton = require('../../common/AddButton');


const PharmacyPanel = ({pharmacy}) => {

	return (
		<Col xs={12} md={4}>
			 <div className="card">
			     <div className="card-header">
				     <Button bsStyle="primary" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
				      <h5 className="card-headline">Pharmacy</h5>
			     </div>
			     {pharmacy.map((item) =>
			     <div className="card-block">
		 		     <p className="card-text"><b>Name</b>: {item.business_name}</p>
				     <p className="card-text"><b>Address</b>: {item.address}</p>
				     <p className="card-text"><b>Phone</b>: {item.phone}</p>
				     <p className="card-text"><b>Current</b>: {item.current}</p>
			     </div>
			     )}
			</div>
		</Col>
	)

	// return (
	// <Col xs={4} md={4}>
	// 	     <Panel collapsible header="Pharmacy">
	// 	     <ListGroup fill>
	// 	     {pharmacy.map((item) =>
	// 	    <ListGroupItem className="pharmacy-item">
	// 		     <p className="card-text"><b>Name</b>: {item.business_name}</p>
	// 		     <p className="card-text"><b>Address</b>: {item.address}</p>
	// 		     <p className="card-text"><b>Phone</b>: {item.phone}</p>
	// 		     <p className="card-text"><b>Current</b>: {item.current}</p>
	// 	     </ListGroupItem>
	// 	    )}
	// 	     </ListGroup>
	// 	  </Panel>
	// </Col>
	// )
}

module.exports = PharmacyPanel;