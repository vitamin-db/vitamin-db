const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Modal = require('react-bootstrap').Modal;
const Input = require('react-bootstrap').Input;
const FormComponent = require('./Form');
const InsForm = require('./PatientForms/InsForm');
const Phorm = require('./PatientForms/PharmForm');

const AddDoc = React.createClass({
getInitialState() {
    return {
      show: false,
      doc: true,
      ins: false,
      pharm: false
    };
  },
  showModal() {
    this.setState({show: true});
  },
  hideModal() {
    this.setState({show: false});
  },
  toggleDoc() {
    this.setState({doc: true, ins: false, pharm: false});
  },
  toggleIns() {
    this.setState({ins: true, doc: false, pharm: false});
  },
  togglePharm() {
    this.setState({pharm: true, doc:false, ins: false});
  },
  render() {
	return(
    <div>

        <Col xs={12} md={4}>
        <div className="card">
          <div className="card-header">
            <Button bsStyle="primary" bsSize="small" onClick={this.showModal}><Glyphicon glyph="plus" /></Button>
            <h5 className="card-headline">Add a new card</h5>
          </div>
        </div>
        </Col>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">

          <button onClick={this.toggleDoc} >Doctor form</button>
          <button onClick={this.toggleIns} >Insurance form</button>
          <button onClick={this.togglePharm} >Pharmacy form</button>

          {this.state.doc && <FormComponent addDoc={this.props.addDoc} docApiList={this.props.docApiList} searchDoc={this.props.searchDoc} />}
          {this.state.ins && <InsForm addIns={this.props.addIns} />}
          {this.state.pharm && <Phorm addPharm={this.props.addPharm} />}

        </Modal>

    </div>
    )
  }
});

module.exports = AddDoc;