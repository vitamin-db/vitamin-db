const React = require('react');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

const EditButton = React.createClass ({
render() {
  return(
	<div>
	 	<Button className="edit-button" bsSize="xsmall" ><Glyphicon glyph="edit" /></Button>
	</div>
	)
  }
})

module.exports = EditButton;
