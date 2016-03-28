const React = require('react');
const Panel = require('react-bootstrap').Panel;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Col = require('react-bootstrap').Col;

const AllergyItem = React.createClass({
	getInitialState() {
		return {
			show: true
		};
	},
	toggleShow() {
		var toggled = !this.state.show;
		this.setState({
			show: toggled
		});
	},
	submitChange(id, e) {
		e.preventDefault();
		// this.props.NAME_OF_DISPATCH(id, e);
		this.toggleShow();
	},
	render() {
		return (
			<div>
				{this.state.show && <div>
					{this.props.val.allergen + ' - ' + this.props.val.current}
					</div>}

				{!this.state.show && <div>
					<form onSubmit={this.submitChange.bind(null, this.props.val.id_allergy)}>
						<input name="allergen" placeholder={this.props.val.allergen} requried />
						<input name="current" type="checkbox" />
						<Button type="submit">Submit</Button>
					</form>
				</div>}

				<div className="btn-group">
					<Button className="edit-button" onClick={this.toggleShow} bsSize="xsmall" ><Glyphicon glyph="edit" /></Button>
					<Button onClick={this.props.removeAllergy.bind(null, this.props.val.id_allergy)} className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
				</div>
				</div>
		)
	}
})

module.exports = AllergyItem;