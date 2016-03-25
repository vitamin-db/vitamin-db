const React = require('react');
const Input = require('react-bootstrap').Input;
const Button = require('react-bootstrap').Button;
const Col = require('react-bootstrap').Col;

const Phorm = ({addPharm}) => {
  return (
   <div>
    <h1>Add new pharmacy:</h1>
	   <div>
	   	<form onSubmit={addPharm} className="form-horizontal">
        <Input name="pharmacy" type="text" label="Pharmacy" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Pharmacy" />
        <Input name="address" type="text" label="Address" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Address" />
        <Input name="phone" type="text" label="Phone" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Phone" />
	   		<br/>
	   		<input name="current" type="checkbox" /> Current Pharmacy?
	   		<br/>
        <Button type="submit" bsStyle="primary" bsSize="large" block>Add</Button>
	   	</form>
	   </div>
   </div>
  )
};

module.exports = Phorm;

