const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
// const PatientCard = require('./PatientCard');
// const AddInfo = require('./AddInfo');

const content = (
	<div className="patient-item">
	 	<Button className="patient-button" bsSize="xsmall" ><Glyphicon glyph="plus" /></Button>
	    <h6 className="card-type">Add</h6>
	</div>
)


const PatientGrid = ({patientInfo}) => (
<div className="container-fluid">
  <Grid>
    <Row className="show-grid">

		<Col xs={4} md={4}>
	 	<Panel collapsible defaultExpanded header='hey'>
	 		<ListGroup fill>
{patientInfo.map((val) => 
				<ListGroupItem className="patient-item"><b>1 </b>{val.allergies}</ListGroupItem>
		 		)}

		 		{content}
	 		</ListGroup>
  	 	</Panel>

		</Col>

    </Row>
  </Grid>
  </div>
);


module.exports = PatientGrid;