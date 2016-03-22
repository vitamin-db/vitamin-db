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

        <div className="card-full-text">
        <h1>Add an eye prescription:</h1>

      		<form onSubmit={this.props.addEye} >
          
      			<h3>Right(OD)</h3>
            <Col xs={12} md={6}>
        			<Input name="sphere_right" type="text" label="Sphere (right):" placeholder="Sphere" required />
        			<Input name="cylinder_right" type="text" label="Cylinder (right):" placeholder="Cylinder" required />
            </Col>
            <Col xs={12} md={6}>
        			<Input name="axis_right" type="text" label="Axis (right):" placeholder="Axis" required />
        			<Input name="add_right" type="text" label="Add (right):" placeholder="Add" required />
            </Col>


      			<h3>Left(OS)</h3>
            <Col xs={12} md={6}>
        			<Input name="sphere_left" type="text" label="Sphere (left):" placeholder="Sphere" required />
        			<Input name="cylinder_left" type="text" label="Cylinder (left):" placeholder="Cylinder" required />
      			</Col>
            <Col xs={12} md={6}>
              <Input name="axis_left" type="text" label="Axis (left):" placeholder="Axis" required />
        			<Input name="add_left" type="text" label="Add (left):" placeholder="Add" required />
            </Col>
      			<br/>
      			<Button type="submit" bsStyle="primary" bsSize="large" block>Add new eye prescription</Button>
      		</form>

        </div>

        </Modal>


    </div>
    )
  }
});

module.exports = AddButton;