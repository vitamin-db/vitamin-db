const React = require('react');

const Schedule = ({appointment, immunization}) => {
  	console.log('apt', appointment, 'immune', immunization)
  	return (
  		<div>
  			{appointment.map((val) =>
  				<p>{val.text}</p>
  			)}
  			{immunization.map((val) =>
  				<p>{val.name}</p>
  			)}
  		</div>
  	)
}

module.exports = Schedule;