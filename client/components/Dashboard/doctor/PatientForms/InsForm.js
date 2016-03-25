const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;

const InsForm = ({addIns}) => {
  return (
   <div>
    <h1>Add new insurance:</h1>
	   <div>
	   	<form onSubmit={addIns} className="form-horizontal">
        <Input name="provider" type="text" label="Provider" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Provider" />
        <Input name="plan" type="text" label="Plan" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Plan" />
        <Input name="groupid" type="text" label="Group Id" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Group Id" />
        <Input name="memberid" type="text" label="Member Id" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Member Id" />
	   		<br/>
	   		<Button type="submit" bsStyle="primary" bsSize="large" block>Add insurance</Button>
	   	</form>
	   </div>
   </div>
  )
};

module.exports = InsForm;