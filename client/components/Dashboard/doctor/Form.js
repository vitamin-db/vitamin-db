const React = require('react');
const Input = require('react-bootstrap').Input;
const DocApiCard = require('./DocApiCard');
const Button = require('react-bootstrap').Button;

// const AddForm = ({addDoc, searchDoc, docApiList}) => {
//   return (
//    <div>
//     <h1>Search your doctor:</h1>
// 	   <form onSubmit={searchDoc} className="form-horizontal">
// 		    <Input name="firstname" type="text" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="First Name" />
// 		    <Input name="lastname" type="text" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10" placeholder="Last Name" />
// 		    <Button type="submit" bsStyle="primary" bsSize="large" block>Search</Button>
// 	   </form>
// 	   <div>
// 	   	{docApiList.map((doc) =>
// 	   		<DocApiCard key={doc.phone} addDoc={addDoc} doc={doc} />
// 	   	)}
// 	   </div>
//    </div>
//   )
// };

const AddForm = React.createClass({
	getInitialState() {
		return {show: true};
	},
	toggleShow() {
		var change = !this.state.show;
		this.setState({show: change});
	},
	submitDoc(e) {
		e.preventDefault();
		this.props.addMyDoc(e);
		this.props.hideModal();
	},
	render() {
		return (
			<div>
				<h1>Search your doctor:</h1>
				<Button onClick={this.toggleShow} bsStyle="primary" bsSize="large" block>Enter doctor manually</Button>
				{this.state.show && <form onSubmit={this.props.searchDoc} className="form-horizontal">
					<Input name="firstname" type="text" label="First Name" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="First Name" />
					<Input name="lastname" type="text" label="Last Name" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Last Name" />
					<Button type="submit" bsStyle="primary" bsSize="large" block>Search</Button>
				</form>}

				{!this.state.show && <form onSubmit={this.props.addMyDoc} className="form-horizontal">
					<Input name="specialty" type="text" label="Specialty" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Specialty" />
					<Input name="name" type="text" label="Doctor Name" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Name" />
					<Input name="address" type="text" label="Address" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Address" />
					<Input name="phone" type="number" label="Phone" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="Phone" />

					<Button type="submit" bsStyle="primary" bsSize="large" block>Add</Button>
				</form>}
				<div>
					{this.props.docApiList.map((doc) =>
						<DocApiCard hideModal={this.props.hideModal} key={doc.phone} addDoc={this.props.addDoc} doc={doc} />
					)}
				</div>
			</div>
		);
	}
});

module.exports = AddForm;