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
    return {
      show: false,
      lat: 30.268884,
      lon: -97.740520
    };
  },
  showModal() {
    // api call for converting address to lat/lon
    // .then set state for show AND lat/lon
    this.setState({show: true});
  },
  hideModal() {
    this.setState({show: false});
  },
  render() {
  return(
    <div>
          <div className="card-header">
            <Button bsStyle="primary" bsSize="small" className="card-button" onClick={this.showModal}><Glyphicon glyph="plus-sign" /></Button>
            <h5 className="card-headline">{this.props.type}</h5>
          </div>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal">

            <img src={this.props.glyph} />
              <div className="card-full-text">
                <h2>Name: {this.props.val.name}</h2>
                <p><strong>Specialty:</strong> {this.props.val.type} <br />
                <strong>Phone:</strong> {this.props.val.phone} <br />
                <strong>Address:</strong> {this.props.val.street_address} </p>
              </div>
              <div className="JoogleMaps"><JoogleMaps lon={this.state.lon}  lat={this.state.lat} /></div>

        </Modal>
    </div>
    )
  }
});

module.exports = DoctorFull;