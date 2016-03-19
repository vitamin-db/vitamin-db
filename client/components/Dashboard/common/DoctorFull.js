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
const JoogleMaps = require('../../GoogleMaps/GoogleMaps');
// const FormComponent = require('./Form');
// const FormUI = require('./FormUI');

const DoctorFull = React.createClass({
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
          <div className="card-header">
            <Button bsStyle="success" bsSize="small" className="card-button" onClick={this.showModal}><Glyphicon glyph="plus-sign" /></Button>
            <h5 className="card-headline">{this.props.type}</h5>
          </div>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">
            <img src={this.props.glyph} />
              put doctor full info here
            <div className="JoogleMaps"><JoogleMaps lon={-97.740520}  lat={30.268884} /></div>
        </Modal>
    </div>
    )
  }
});

module.exports = DoctorFull;