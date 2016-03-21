const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const ButtonToolbar = require('react-bootstrap').ButtonToolbar;
const Modal = require('react-bootstrap').Modal;
const Input = require('react-bootstrap').Input;
// const FormComponent = require('./Form');
// const FormUI = require('./FormUI');

const AddButton = React.createClass({
getInitialState() {
    return {
      show: false
    };
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
  

          <div className="patient-item">
            <Button bsStyle="primary" bsSize="small" onClick={this.showModal}><Glyphicon glyph="plus" /></Button>
            <h6 className="card-headline">Add New</h6>
          </div>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">

		<form onSubmit={this.props.addEye} >
			<h3>Right(OD)</h3>
			<input name="sphere_right" placeholder="Sphere" required />
			<input name="cylinder_right" placeholder="Cylinder" required />
			<input name="axis_right" placeholder="Axis" required />
			<input name="add_right" placeholder="Add" required />
			<h3>Left(OS)</h3>
			<input name="sphere_left" placeholder="Sphere" required />
			<input name="cylinder_left" placeholder="Cylinder" required />
			<input name="axis_left" placeholder="Axis" required />
			<input name="add_left" placeholder="Add" required />
			<br/>
			<button type="submit">Add Info</button>
		</form>

        </Modal>


    </div>
    )
  }
});

module.exports = AddButton;