const React = require('react');
const Panel = require('react-bootstrap').Panel;
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const AddButton = require('../../common/AddButton');
const EditButton = require('../../common/EditButton');
const NewEye = require('./PatientHelpers/NewEyeRX');

const EyePanel = ({removeEye, addEye, eyerx}) => {
	// var current = allergies.map((curr) =>  {
	// 	return curr.current;
	// })
	// console.log(current);

// 	return (
// 		<Col xs={12} md={8}>
// 		<Panel collapsible header='Eye Prescription'>
// 	 	  {(eyerx.length>0) && <Table responsive>
// 	 		<thead>
// 	 		  <tr>
// 	 			<th>Eye:</th>
// 	 			<th>Sphere:</th>
// 	 			<th>Cylinder:</th>
// 	 			<th>Axis:</th>
// 	 			<th>Add:</th>
// 	  		  </tr>
// 	  		</thead>
// 	  		{eyerx.map((val, count) => 
// 	  		<tbody key={count} >

// 	  			<tr>
// 	  				<td>Right (OD):</td>
// 	  				<td>{val.sphere_right}</td>
// 	  				<td>{val.cylinder_right}</td>
// 	  				<td>{val.axis_right}</td>
// 	  				<td>{val.add_right}</td>
// 	  				<td><EditButton /></td>
// 	  				<td>
// 	  				<Button onClick={removeEye.bind(null, val.id_eyerx)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
// 	  				</td>
// 	  			</tr>

// 	  			<tr>
// 	  				<td>Left (OS):</td>
// 	  				<td>{val.sphere_left}</td>
// 	  				<td>{val.cylinder_left}</td>
// 	  				<td>{val.axis_left}</td>
// 	  				<td>{val.add_left}</td>
// 	  				<td><EditButton /></td>
// 	  				<td>
// 	  				<Button onClick={removeEye.bind(null, val.id_eyerx)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
// 	  				</td>
// 	  			</tr>
// 	  		</tbody>
// 	  		)}
// 	 	  </Table>}

// 	 	  {(!eyerx.length>0) && <NewEye addEye={addEye} />}

//   	 	</Panel>
//   	 	</Col>
// 	)
// }

	return (
		<Col xs={12} md={8}>
		<Panel collapsible header='Eye Prescription'>
	 	  {(Object.keys(eyerx).length>1) && <Table responsive>
	 		<thead>
	 		  <tr>
	 			<th>Eye:</th>
	 			<th>Sphere:</th>
	 			<th>Cylinder:</th>
	 			<th>Axis:</th>
	 			<th>Add:</th>
	  		  </tr>
	  		</thead>

	  		<tbody>
	  			<tr>
	  				<td>Right (OD):</td>
	  				<td>{eyerx.sphere_right}</td>
	  				<td>{eyerx.cylinder_right}</td>
	  				<td>{eyerx.axis_right}</td>
	  				<td>{eyerx.add_right}</td>
	  				<td><EditButton /></td>
	  				<td>
	  				<Button onClick={removeEye.bind(null, eyerx.id_eyerx)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
	  				</td>
	  			</tr>

	  			<tr>
	  				<td>Left (OS):</td>
	  				<td>{eyerx.sphere_left}</td>
	  				<td>{eyerx.cylinder_left}</td>
	  				<td>{eyerx.axis_left}</td>
	  				<td>{eyerx.add_left}</td>
	  				<td><EditButton /></td>
	  				<td>
	  					<Button onClick={removeEye.bind(null, eyerx.id_eyerx)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
	  				</td>
	  			</tr>
	  		</tbody>
	 	  </Table>}

	 	  <NewEye addEye={addEye} />

  	 	</Panel>
  	 	</Col>
	)
}

module.exports = EyePanel;

