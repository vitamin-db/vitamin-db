const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const AddButton = require('../common/AddButton');


const InsurancePanel = ({insurance}) => {
	// var insurance = insurance.map((curr) =>  {
	// 	return curr
	// })
	// console.log(insurance[0]);

	return (
		<Col xs={4} md={4}>
			 <div className="card">
			     <div className="card-header">
				     <Button bsStyle="success" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
				      <h5 className="card-type">Insurance</h5>
			     </div>
			     {insurance.map((item) =>
			     <div className="card-block">
	 		     <p className="card-text"><b>Provider</b>: {item.plan_name}</p>
	 		     <p className="card-text"><b>Plan</b>: {item.plan_id}</p>
	 		     <p className="card-text"><b>Group ID</b>: {item.group_id}</p>
	 		     <p className="card-text"><b>Member ID</b>: {item.rx_bin}</p>
			     </div>
			     )}
			</div>
		</Col>
	)

	// return (
	// <Col xs={4} md={4}>
	// 	     <Panel collapsible header="Insurance">
	// 	     <ListGroup fill>
	// 	     {insurance.map((item) =>
	// 	    <ListGroupItem className="insurance-item">
	// 		     <p className="card-text"><b>Provider</b>: {item.plan_name}</p>
	// 		     <p className="card-text"><b>Current</b>: {item.current}</p>
	// 		     <p className="card-text"><b>Plan</b>: {item.plan_id}</p>
	// 		     <p className="card-text"><b>Group ID</b>: {item.group_id}</p>
	// 		     <p className="card-text"><b>Member ID</b>: {item.rx_bin}</p>
	// 	     </ListGroupItem>
	// 	    )}
	// 	     {AddButton}
	// 	     </ListGroup>
	// 	  </Panel>
	// </Col>
	// )
}

module.exports = InsurancePanel;