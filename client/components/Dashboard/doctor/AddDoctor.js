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
const FormComponent = require('./Form');


// const AddForm = () => {
// <div>
//   <form className="form-horizontal">
//     <Input type="text" label="Text" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
//     <Input type="textarea" label="Textarea" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
//     <Input type="checkbox" label="Checkbox" wrapperClassName="col-xs-offset-2 col-xs-10" help="Offset is applied to wrapper." />
//   </form>
//   </div>
//  )
// }


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
      <ButtonToolbar>
        <Col xs={4} md={4}>
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

      </ButtonToolbar>
    </div>
    )
  }
});

module.exports = AddDoc;