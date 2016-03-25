const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const InsForm = ({addIns}) => {
  return (
   <div>
    <h1>Fill in your Insurance info:</h1>
	   <div>
	   	<form onSubmit={addIns} >
	   		Provider: <input name="provider" placeholder="Provider" />
	   		Plan: <input name="plan" placeholder="Plan" />
	   		<br/>
	   		Group ID: <input name="groupid" type="number" placeholder="Group ID" />
	   		Member ID: <input name="memberid" type="number" placeholder="Member ID" />
	   		<br/>
	   		<button type="submit" >Submit</button>
	   	</form>
	   </div>
   </div>
  )
};

module.exports = InsForm;