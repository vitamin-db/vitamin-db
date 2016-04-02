const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const DocCard = require('./DoctorCard');
const AddDoc = require('./AddDoctor');
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;

//patient info
const Insurance = require('../patient/PatientInfo/Insurance');
const Pharmacy = require('../patient/PatientInfo/Pharmacy');

// const DoctorGrid = ({editIns, addMyDoc, removePharm, addPharm, addIns, removeIns, editDoc, removeDoc, addDoc, docApiList, searchDoc, docInfo, insurance, pharmacy, addAppointment}) => (
// 	  <Grid>
// 		<div className="container-fluid">
// 	    <Row className="show-grid">
// 	      {docInfo.map((val, count) => 
// 	        <DocCard key={count} editDoc={editDoc} removeDoc={removeDoc} addAppointment={addAppointment} val={val} />
// 	      )}
// 	      	{!docInfo[0] && <h1>No current doctor! Add a new doctor card below!</h1>}
// 	      	<Insurance editIns={editIns} removeIns={removeIns} insurance={insurance} />
// 			<Pharmacy removePharm={removePharm} pharmacy={pharmacy} />
			
// 	      <AddDoc addMyDoc={addMyDoc} addPharm={addPharm} addIns={addIns} addDoc={addDoc} docApiList={docApiList} searchDoc={searchDoc} />
// 	    </Row>
// 	  	</div>
// 	  </Grid>
// );

const DoctorGrid = React.createClass({
	getInitialState() {
		return {
			doc: true,
			ins: true,
			pharm: true
		};
	},
	showAll() {
		this.setState({
			doc: true,
			ins: true,
			pharm: true
		})
	},
	toggleDoc() {
		this.setState({
			doc: true,
			ins: false,
			pharm: false
		})
	},
	toggleIns() {
		this.setState({
			doc: false,
			ins: true,
			pharm: false
		})
	},
	togglePharm() {
		this.setState({
			doc: false,
			ins: false,
			pharm: true
		})
	},
	render(){
		return (
		  <Grid>
			<div className="container-fluid">
		    <Row className="show-grid">
		    <ButtonToolbar>
		    	<Button onClick={this.showAll} bsStyle="primary">Show all</Button>
		    	<Button onClick={this.toggleDoc} bsStyle="primary">Show my doctors</Button>
		    	<Button onClick={this.toggleIns} bsStyle="primary">Show my insurance</Button>
		    	<Button onClick={this.togglePharm} bsStyle="primary">Show my pharmacies</Button>
		    </ButtonToolbar>
	    	<br/>
				{this.state.doc && <div>
					{this.props.states.doctor.map((val, count) => 
						<DocCard key={count} editDoc={this.props.dispatches.editDoc} removeDoc={this.props.dispatches.removeDoc} 
						addAppointment={this.props.dispatches.addAppointment} val={val} />
					)}
				</div>}
		      	{this.state.ins && <div>
		      		{this.props.states.insurance.map((item, count) =>
		      			<Insurance key={count} item={item} editIns={this.props.dispatches.editIns} 
		      			removeIns={this.props.dispatches.removeIns} insurance={this.props.states.insurance} />
		      		)}
		      	</div>}
				{this.state.pharm && <div>
					{this.props.states.pharmacy.map((item, count) =>
						<Pharmacy key={count} item={item} editPharm={this.props.dispatches.editPharm} 
						removePharm={this.props.dispatches.removePharm} pharmacy={this.props.states.pharmacy} />
					)}
				</div>}
				
	      <AddDoc addMyDoc={this.props.dispatches.addMyDoc} addPharm={this.props.dispatches.addPharm} 
	      addIns={this.props.dispatches.addIns} addDoc={this.props.dispatches.addDoc} 
	      docApiList={this.props.states.docApiList} searchDoc={this.props.dispatches.searchDoc} />
	    	</Row>
  		</div>
	  	</Grid>
		);
	}
})

module.exports = DoctorGrid;