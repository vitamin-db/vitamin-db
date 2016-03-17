const React = require('react');

const docApiCard = ({doc, clearDoc, addDoc}) => (
	<div className="docApiCard" >
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
		<button onClick={addDoc} >This is my doctor</button>
	</div>
);

module.exports = docApiCard;