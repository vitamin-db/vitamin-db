const React = require('react');
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Grid = require('react-bootstrap').Grid;
const Panel = require('react-bootstrap').Panel;
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Modal = require('react-bootstrap').Modal;


const Example = React.createClass({
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
  		 <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          >
      <Col xs={4} md={4}>
	      <div className="card">
	        <div className="card-header">
	          <Button bsStyle="primary" bsSize="small" ><Glyphicon glyph="plus" /></Button>
	          <h5 className="card-type">Add</h5>
	        </div>
	      </div>
      </Col>
      </Modal>
      </div>
	);
   }
});

module.exports = AddInfo;