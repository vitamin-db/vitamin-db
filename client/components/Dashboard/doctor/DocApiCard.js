const React = require('react');

const docApiCard = ({doc}) => (
	<div className="docApiCard" >
		Name: {doc.firstname} {doc.lastname}
		<br/>
		Phone: {doc.phone}
		<br/>
		Business: {doc.business}
		<br/>
		Address: {doc.address}
		<br/>
		<button>This is my doctor</button>
	</div>
);

module.exports = docApiCard;