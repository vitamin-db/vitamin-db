const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const AddButton = require('../../common/AddButton');


// const PharmacyPanel = ({removePharm, pharmacy}) => {

// 	return (
// 		<Col xs={12} md={4}>
// 			 <div className="card">
// 			     <div className="card-header">
// 				     <Button bsStyle="primary" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
// 				      <h5 className="card-headline">Pharmacy</h5>
// 			     </div>
// 			     {pharmacy.map((item, count) =>
// 			     <div className="card-block" key={count} >
// 			     	 <button onClick={removePharm.bind(null, item.id_pharmacy)} >Remove</button>
// 		 		     <p className="card-text"><b>Name</b>: {item.business_name}</p>
// 				     <p className="card-text"><b>Address</b>: {item.address}</p>
// 				     <p className="card-text"><b>Phone</b>: {item.phone}</p>
// 				     <p className="card-text"><b>Current</b>: {item.current.toString()}</p>
// 			     </div>
// 			     )}
// 			</div>
// 		</Col>
// 	)
// }

const PharmacyPanel = React.createClass({
	getInitialState: function() {
		return {show: true};
	},
	toggleShow: function() {
		var newState = !this.state.show;
		this.setState({show: newState});
	},
	submitChange: function(id, e) {
		e.preventDefault();
		this.props.editPharm(id, e);
		this.toggleShow();
	},
	render() {
		return (
			<Col xs={12} md={4}>
				 <div className="card">
				     <div className="card-header">
					     <Button bsStyle="primary" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
					      <h5 className="card-headline">Pharmacy</h5>
				     </div>

				     <div className="card-block">
				     	 <Button onClick={this.toggleShow}>edit</Button>
				     	 <Button onClick={this.props.removePharm.bind(null, this.props.item.id_pharmacy)}>Remove</Button>

			 		     {this.state.show && <div>
			 		     <p className="card-text"><b>Name</b>: {this.props.item.business_name}</p>
					     <p className="card-text"><b>Address</b>: {this.props.item.address}</p>
					     <p className="card-text"><b>Phone</b>: {this.props.item.phone}</p>
					     <p className="card-text"><b>Current</b>: {this.props.item.current.toString()}</p>
				     	 </div>}

				     	 {!this.state.show && <div>
				     	 	<form onSubmit={this.submitChange.bind(null, this.props.item.id_pharmacy)}>
				     	 		Name: <input name="name" placeholder="Name" />
				     	 		<br/>
				     	 		Address: <input name="address" placeholder="Address" />
				     	 		<br/>
				     	 		Phone: <input name="phone" placeholder="Phone" />
				     	 		<br/>
				     	 		Current?: <input name="current" type="checkbox"/>
				     	 		<br/>
				     	 		<Button type="submit">Submit</Button>
				     	 	</form>
				     	 </div>}

				     </div>
				</div>
			</Col>
		)
	}
})

module.exports = PharmacyPanel;