const React = require('react');

const docApiCard = ({doc, clearDoc, addDoc}) => (
	<div className="docApiCard" >
		<form onSubmit={addDoc} >
			<input type="hidden" name="specialty" value={doc.specialty} />
			Specialty: {doc.specialty}
			<br/>
			<input type="hidden" name="firstname" value={doc.firstname} />
			<input type="hidden" name="lastname" value={doc.lastname} />
			Name: {doc.firstname} {doc.lastname}
			<br/>
			<input type="hidden" name="phone" value={doc.phone} />
			Phone: {doc.phone}
			<br/>
			<input type="hidden" name="business" value={doc.business} />
			Business: {doc.business}
			<br/>
			<input type="hidden" name="address" value={doc.address} />
			Address: {doc.address}
			<br/>
			<input type="hidden" name="portrait" value={doc.portrait} />
			<img src={doc.portrait} />
			<br/>
			<button type="submit" >This is my doctor</button>
		</form>
	</div>
);

module.exports = docApiCard;