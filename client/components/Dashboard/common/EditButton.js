const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
// const Button = require('react-bootstrap').Button;
// const Glyphicon = require('react-bootstrap').Glyphicon;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const Modal = require('react-bootstrap').Modal;
const Input = require('react-bootstrap').Input;
// const FormComponent = require('./Form');
// const FormUI = require('./FormUI');

const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;



const EditButton = React.createClass({
getInitialState() {
    return {show: false};
  },
  showModal() {
    this.setState({show: true});
  },
  hideModal() {
    this.setState({show: false});
  },
  render() {
	return(
		<div>
		 	<Button className="edit-button" bsSize="xsmall" ><Glyphicon glyph="edit" /></Button>
		</div>
    )
  }
});

module.exports = EditButton;