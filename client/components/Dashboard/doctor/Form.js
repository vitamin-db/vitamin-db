const React = require('react');
const Input = require('react-bootstrap').Input;
const DocApiCard = require('./DocApiCard');

const AddForm = ({addDoc, docApiList}) => {
  return (
   <div>
	   <form onSubmit={addDoc} className="form-horizontal">
		    <Input name="firstname" type="text" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="First Name" />
		    <Input name="lastname" type="text" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Last Name" />
		    <button type="submit">Submit</button>
	   </form>
	   <div>
	   	{docApiList.map((doc) =>
	   		<DocApiCard key={doc.phone} doc={doc} />
	   	)}
	   </div>
   </div>
  )
};

module.exports = AddForm;