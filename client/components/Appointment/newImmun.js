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
            <h6 className="card-headline">Add New Immunization</h6>
          </div>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">

        <div className="card-full-text">
        <h1>Add Immunizations:</h1>
      		<form onSubmit={this.props.addImmun}>
      		        <Input name="type" type="text" placeholder="type" required />
        			<Input name="date" type="date" label="date" placeholder="date" required />
        			<Input name="notes" type="text" label="notes" placeholder="notes" required />
        			<br/>
      			<Button type="submit" bsStyle="primary" bsSize="large" block>Add new immunization</Button>
      		</form>

        </div>

        </Modal>


    </div>
    )
  }
});

module.exports = AddButton;