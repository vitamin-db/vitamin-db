const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const DocCard = require('./DoctorCard');
const AddDoc = require('./AddDoctor');

//patient info
const Insurance = require('../patient/PatientInfo/Insurance');
const Pharmacy = require('../patient/PatientInfo/Pharmacy');

const DoctorGrid = ({removePharm, addPharm, addIns, removeIns, editDoc, removeDoc, addDoc, docApiList, searchDoc, docInfo, insurance, pharmacy, addAppointment}) => (
	  <Grid>
		<div className="container-fluid">
	    <Row className="show-grid">
	      {docInfo.map((val, count) => 
	        <DocCard key={count} editDoc={editDoc} removeDoc={removeDoc} addAppointment={addAppointment} val={val} />
	      )}
	      	{!docInfo[0] && <h1>No current doctor! Add a new doctor card below!</h1>}
	      	<Insurance removeIns={removeIns} insurance={insurance} />
			<Pharmacy removePharm={removePharm} pharmacy={pharmacy} />
			
	      <AddDoc addPharm={addPharm} addIns={addIns} addDoc={addDoc} docApiList={docApiList} searchDoc={searchDoc} />
	    </Row>
	  	</div>
	  </Grid>
);


module.exports = DoctorGrid;