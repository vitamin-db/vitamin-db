const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Modal = require('react-bootstrap').Modal;
const Input = require('react-bootstrap').Input;
const FormComponent = require('./Form');


const AddDoc = React.createClass({
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

        <Col xs={12} md={4}>
        <div className="card">
          <div className="card-header">
            <Button bsStyle="primary" bsSize="small" onClick={this.showModal}><Glyphicon glyph="plus" /></Button>
            <h5 className="card-type">Add Doctor</h5>
          </div>
        </div>
        </Col>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">

          <FormComponent addDoc={this.props.addDoc} docApiList={this.props.docApiList} searchDoc={this.props.searchDoc} />

        </Modal>

    </div>
    )
  }
});

module.exports = AddDoc;