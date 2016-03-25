const React = require('react');
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;

// const docApiCard = ({doc, clearDoc, addDoc}) => (

// 	<div className="docApiCard" >
// 		<Col xs={12} md={4}>
// 			<img src={doc.portrait} />
// 		</Col>
// 		<Col xs={12} md={8}>
// 			<p>Specialty: {doc.specialty}
// 			<br/>
// 			Name: {doc.firstname} {doc.lastname}
// 			<br/>
// 			Phone: {doc.phone}
// 			<br/>
// 			Business: {doc.business}
// 			<br/>
// 			Address: {doc.address}
// 			<br/></p>
// 			<Button onClick={addDoc.bind(null, doc)} type="submit" bsStyle="primary" bsSize="large" block>This is my doctor</Button>
// 		</Col>
// 	</div>
// );

const docApiCard = React.createClass({
	submitDoc() {
		this.props.addDoc(this.props.doc);
		this.props.hideModal();
	},
	render() {
		return (
			<div className="docApiCard" >
				<Col xs={12} md={4}>
					<img src={this.props.doc.portrait} />
				</Col>
				<Col xs={12} md={8}>
					<p>Specialty: {this.props.doc.specialty}
					<br/>
					Name: {this.props.doc.firstname} {this.props.doc.lastname}
					<br/>
					Phone: {this.props.doc.phone}
					<br/>
					Business: {this.props.doc.business}
					<br/>
					Address: {this.props.doc.address}
					<br/></p>
					<Button onClick={this.submitDoc} type="submit" bsStyle="primary" bsSize="large" block>This is my doctor</Button>
				</Col>
			</div>
		);
	}
})

module.exports = docApiCard;