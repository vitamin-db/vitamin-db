const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const Phorm = ({addPharm}) => {
  return (
   <div>
    <h1>Fill in your Pharmacy info:</h1>
	   <div>
	   	<form onSubmit={addPharm} >
	   		<input name="pharmacy" placeholder="Pharmacy" />
	   		<input name="address" placeholder="Address" />
	   		<input name="phone" placeholder="Phone" />
	   		<br/>
	   		<input name="current" type="checkbox" /> Current Pharmacy?
	   		<br/>
	   		<button type="submit" >Submit</button>
	   	</form>
	   </div>
   </div>
  )
};

module.exports = Phorm;