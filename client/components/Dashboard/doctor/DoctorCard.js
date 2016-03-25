const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Input = require('react-bootstrap').Input;

const AddDate = require('./AddAppoint')
const DoctorFull = require('../common/DoctorFull');

const DocCard = React.createClass({
	getInitialState: function() {
		return {show: true};
	},
	toggleShow: function() {
		var newState = !this.state.show;
		this.setState({show: newState});
	},
	submitChange(id, e) {
		e.preventDefault();
		this.props.editDoc(id, e);
		this.toggleShow();
	},
	render: function() {
		return (
			<Col xs={12} md={4}>
				 <div className="card">

					<DoctorFull val={this.props.val} type={this.props.val.type} glyph={this.props.val.portrait}/>
						<ButtonToolbar>
							<Button onClick={this.toggleShow} bsStyle="default">Edit</Button>
							<Button onClick={this.props.removeDoc.bind(null, this.props.val.id_doctor)} bsStyle="default">Delete</Button>
						</ButtonToolbar>
				     {this.state.show && <div className="card-block">
					     <p className="card-text"><b>Name</b>: {this.props.val.name}</p>
					     <p className="card-text"><b>Address</b>: {this.props.val.street_address}</p>
					     <p className="card-text"><b>Phone</b>: {this.props.val.phone}</p>
					 	 <AddDate docId={this.props.val.id_doctor} addAppointment={this.props.addAppointment} />				     	
				     	 </div>}
				     {!this.state.show && <div className="card-block">
				     	<h4>Not all fields required.</h4>
				     	<form onSubmit={this.props.editDoc.bind(null, this.props.val.id_doctor)} className="form-horizontal">
				     		<Input name="specialty" type="text" label="Specialty" style="text-align:left" placeholder={this.props.val.type} />
				     		<Input name="name" type="text" label="Name" style="text-align:left" placeholder={this.props.val.name} />
				     		<Input name="address" type="text" label="Address" style="text-align:left" placeholder={this.props.val.street_address} />
				     		<Input name="phone" type="text" label="Phone" style="text-align:left" placeholder={this.props.val.phone} />
				     		<br/>
				     		<Button type="submit" bsStyle="primary" block>Submit</Button>
				     	</form>
				     </div>}
				</div>
			</Col>
		);
	}
})

module.exports = DocCard;