const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const AddButton = require('../../common/AddButton');


// const InsurancePanel = ({removeIns, insurance}) => {
// 	return (
// 		<Col xs={12} md={4}>
// 			 <div className="card">
// 			     <div className="card-header">
// 				     <Button bsStyle="primary" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
// 				      <h5 className="card-headline">Insurance</h5>
// 			     </div>
// 			     {insurance.map((item) =>
// 			     <div key={item.plan_id} className="card-block">
// 			     <button >edit</button>
// 				 <button onClick={removeIns.bind(null, item.id_insurance)} >Remove</button>
// 	 		     <p className="card-text"><b>Provider</b>: {item.plan_name}</p>
// 	 		     <p className="card-text"><b>Plan</b>: {item.plan_id}</p>
// 	 		     <p className="card-text"><b>Group ID</b>: {item.group_id}</p>
// 	 		     <p className="card-text"><b>Member ID</b>: {item.rx_bin}</p>
// 			     </div>
// 			     )}
// 			</div>
// 		</Col>
// 	)
// };

const InsurancePanel = React.createClass({
	getInitialState() {
		return {show: true};
	},
	toggleShow() {
		var change = !this.state.show;
		this.setState({show: change});
	},
	submitChange(id,e){
		e.preventDefault()
		this.props.editIns(id, e);
		this.toggleShow();
	},
	render(){
		return (
			<Col xs={12} md={4}>
				 <div className="card">
				     <div className="card-header">
					     <Button bsStyle="primary" bsSize="small" className="card-button"><Glyphicon glyph="cloud" /></Button>
					      <h5 className="card-headline">Insurance</h5>
				     </div>
				     {this.props.insurance.map((item) =>
			 		     <div key={item.plan_id} className="card-block">
					     <button onClick={this.toggleShow}>edit</button>
						 <button onClick={this.props.removeIns.bind(null, item.id_insurance)} >Remove</button>

			 		     {this.state.show && <div>
				 		     <p className="card-text"><b>Provider</b>: {item.plan_name}</p>
				 		     <p className="card-text"><b>Plan</b>: {item.plan_id}</p>
				 		     <p className="card-text"><b>Group ID</b>: {item.group_id}</p>
				 		     <p className="card-text"><b>Member ID</b>: {item.rx_bin}</p>
				 		 </div>}

			 		     {!this.state.show && <div>
			 		     	<form onSubmit={this.submitChange.bind(null, item.id_insurance)}>
				 		     	Provider: <input name="planname" placeholder={item.plan_name}/>
				 		     	<br/>
				 		     	Plan: <input name="planid" placeholder={item.plan_id}/>
				 		     	<br/>
				 		     	Group ID: <input name="groupid" type="number" placeholder={item.group_id}/>
				 		     	<br/>
				 		     	Member ID: <input name="memberid" type="number" placeholder={item.rx_bin}/>
				 		     	<br/>
				 		     	<button type="submit">Submit</button>
				 		    </form>
			 		     </div>}
			 		 	 
			 		 	 </div>
				     )}
				</div>
			</Col>
		)
	}
})

module.exports = InsurancePanel;