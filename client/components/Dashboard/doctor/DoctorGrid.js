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

const DoctorGrid = ({docApiList, addDoc, docInfo, insurance, pharmacy}) => (
	  <Grid>
		<div className="container-fluid">
	    <Row className="show-grid">
	      {docInfo.map((val) => 
	        <DocCard key={val.name} val={val} />
	      )}

	      	<Insurance insurance={insurance} />
			<Pharmacy pharmacy={pharmacy} />

	      <AddDoc docApiList={docApiList} addDoc={addDoc} />
	    </Row>
	  	</div>
	  </Grid>
);


module.exports = DoctorGrid;