const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Picker = require('../common/DatePicker');
// const DatePicker = require('material-ui/lib/date-picker/date-picker');
const DoctorFull = require('../common/DoctorFull');

// const DocCard = ({ removeDoc, val }) => (
// 	<Col xs={12} md={4}>
// 		 <div className="card">

// 			<DoctorFull type={val.type} glyph={val.portrait}/>
// 				<button onClick={removeDoc.bind(null, val.id_doctor)} >Remove</button>
// 		     <div className="card-block">
// 			     <p className="card-text"><b>Name</b>: {val.name}</p>
// 			     <p className="card-text"><b>Address</b>: {val.street_address}</p>
// 			     <p className="card-text"><b>Phone</b>: {val.phone}</p>
// 			     <Picker />
// 		     </div>
// 		</div>
// 	</Col>
// );

const DocCard = React.createClass({
	getInitialState: function() {
		return {show: true};
	},
	toggleShow: function() {
		var newState = !this.state.show;
		this.setState({show: newState});
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
					     <Picker />
				     </div>}
				     {!this.state.show && <div className="card-block">
				     	<h3>Not all fields required.</h3>
				     	<form onSubmit={this.props.editDoc.bind(null, this.props.val.id_doctor)} >
				     		<input name="specialty" placeholder="Specialty" />
				     		<input name="name" placeholder="Name"/>
				     		<input name="address" placeholder="Address"/>
				     		<input name="phone" placeholder="Phone"/>
				     		<button type="submit">Submit</button>
				     	</form>
				     </div>}
				</div>
			</Col>
		);
	}
})

module.exports = DocCard;