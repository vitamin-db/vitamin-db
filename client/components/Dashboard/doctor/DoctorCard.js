const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

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
						<button onClick={this.toggleShow}>edit</button>
						<button onClick={this.props.removeDoc.bind(null, this.props.val.id_doctor)} >Remove</button>
				     {this.state.show && <div className="card-block">
					     <p className="card-text"><b>Name</b>: {this.props.val.name}</p>
					     <p className="card-text"><b>Address</b>: {this.props.val.street_address}</p>
					     <p className="card-text"><b>Phone</b>: {this.props.val.phone}</p>
					 	 <AddDate docId={this.props.val.id_doctor} addAppointment={this.props.addAppointment} />				     	
				     	 </div>}
				     {!this.state.show && <div className="card-block">
				     	<h3>Not all fields required.</h3>
				     	<form onSubmit={this.submitChange.bind(null, this.props.val.id_doctor)} >
				     		<input name="specialty" placeholder={this.props.val.type} />
				     		<input name="name" placeholder={this.props.val.name}/>
				     		<input name="address" placeholder={this.props.val.street_address}/>
				     		<input name="phone" placeholder={this.props.val.phone}/>
				     		<br/>
				     		<button type="submit">Submit</button>
				     	</form>
				     </div>}
				</div>
			</Col>
		);
	}
})

module.exports = DocCard;