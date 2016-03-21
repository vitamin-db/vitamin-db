const React = require('react');
const Panel = require('react-bootstrap').Panel;
const Table = require('react-bootstrap').Table;
const Col = require('react-bootstrap').Col;
const AddButton = require('../../common/AddButton');
const EditButton = require('../../common/EditButton');
const DeleteButton = require('../../common/DeleteButton');
const NewEye = require('./AddPatientInfo/NewEyeRX');

const EyePanel = ({addEye, eyerx}) => {
	// var current = allergies.map((curr) =>  {
	// 	return curr.current;
	// })
	// console.log(current);

	return (
		<Col xs={12} md={8}>
		<Panel collapsible header='Eye Prescription'>
	 	  {eyerx[0] && <Table responsive>
	 		<thead>
	 		  <tr>
	 			<th>Eye:</th>
	 			<th>Sphere:</th>
	 			<th>Cylinder:</th>
	 			<th>Axis:</th>
	 			<th>Add:</th>
	  		  </tr>
	  		</thead>
	  		{eyerx.map((val) => 
	  		<tbody key={val.id_eyerx} >

	  			<tr>
	  				<td>Right(OD)</td>
	  				<td>{val.sphere_right}</td>
	  				<td>{val.cylinder_right}</td>
	  				<td>{val.axis_right}</td>
	  				<td>{val.add_right}</td>
	  				<td><EditButton /></td>
	  				<td><DeleteButton /></td>
	  			</tr>

	  			<tr>
	  				<td>Left(OS)</td>
	  				<td>{val.sphere_left}</td>
	  				<td>{val.cylinder_left}</td>
	  				<td>{val.axis_left}</td>
	  				<td>{val.add_left}</td>
	  				<td><EditButton /></td>
	  				<td><DeleteButton /></td>
	  			</tr>
	  		</tbody>
	  		)}
	 	  </Table>}

	 	  <NewEye addEye={addEye} />

  	 	</Panel>
  	 	</Col>
	)
}

module.exports = EyePanel;

