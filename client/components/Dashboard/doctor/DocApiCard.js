const React = require('react');

const docApiCard = ({doc, clearDoc, addDoc}) => (
	<div className="docApiCard" >
			Specialty: {doc.specialty}
			<br/>
			Name: {doc.firstname} {doc.lastname}
			<br/>
			Phone: {doc.phone}
			<br/>
			Business: {doc.business}
			<br/>
			Address: {doc.address}
			<br/>
			<img src={doc.portrait} />
			<br/>
			<button onClick={addDoc.bind(null, doc)}>This is my doctor</button>
	</div>
);

module.exports = docApiCard;