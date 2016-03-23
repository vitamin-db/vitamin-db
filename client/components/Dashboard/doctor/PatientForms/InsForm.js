const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const InsForm = ({addIns}) => {
  return (
   <div>
    <h1>Fill in your Insurance info:</h1>
	   <div>
	   	<form onSubmit={addIns} >
	   		<input name="provider" placeholder="Provider" />
	   		<input name="plan" placeholder="Plan" />
	   		<br/>
	   		<input name="groupid" placeholder="Group ID" />
	   		<input name="memberid" placeholder="Member ID" />
	   		<br/>
	   		<button type="submit" >Submit</button>
	   	</form>
	   </div>
   </div>
  )
};

module.exports = InsForm;