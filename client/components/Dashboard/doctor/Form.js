const React = require('react');
const Input = require('react-bootstrap').Input;
const DocApiCard = require('./DocApiCard');
const Button = require('react-bootstrap').Button;

const AddForm = ({addDoc, searchDoc, docApiList}) => {
  return (
   <div>
	   <form onSubmit={searchDoc} className="form-horizontal">
		    <Input name="firstname" type="text" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="First Name" />
		    <Input name="lastname" type="text" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Last Name" />
		    <Button type="submit" bsStyle="primary" bsSize="large" block>Log in</Button>
	   </form>
	   <div>
	   	{docApiList.map((doc) =>
	   		<DocApiCard key={doc.phone} addDoc={addDoc} doc={doc} />
	   	)}
	   </div>
   </div>
  )
};

module.exports = AddForm;