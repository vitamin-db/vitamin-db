const React = require('react');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const DeleteButton = React.createClass ({
render() {
  return(
	<div>
	 	<Button className="edit-button" bsSize="xsmall" ><Glyphicon glyph="trash" /></Button>
	</div>
	)
  }
})

module.exports = DeleteButton;
