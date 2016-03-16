const React = require('react');
const Input = require('react-bootstrap').Input;

const AddForm = () => {
  return (
   <div>
	   <form className="form-horizontal">
		    <Input type="text" label="Doctor" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Doctor's name" />
		    <Input type="text" label="Location" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="City, State" />
		    <button>Submit</button>
	   </form>
   </div>
  )
};

module.exports = AddForm;