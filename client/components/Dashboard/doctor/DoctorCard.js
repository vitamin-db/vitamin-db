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

const DocCard = ({ val }) => (
	<Col xs={12} md={4}>
		 <div className="card">

			<DoctorFull type={val.type} glyph={val.portrait}/>

		     <div className="card-block">
			     <p className="card-text"><b>Name</b>: {val.name}</p>
			     <p className="card-text"><b>Address</b>: {val.address}</p>
			     <p className="card-text"><b>Phone</b>: {val.phone}</p>
			     <Picker />
		     </div>
		</div>
	</Col>
);

module.exports = DocCard;