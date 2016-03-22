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
                <h2>Name: Jane Doeblin</h2>
                <p><strong>Specialty:</strong> Obstetrics & Gynecology<br />
                <strong>Phone:</strong> 5852443430<br />
                <strong>Business:</strong> Women Gynecology & Childbirth Associates, P.c.<br />
                <strong>Address:</strong> 1815 Clinton Ave S Ste 610 Rochester, NY 14618</p>
              </div>
              <div className="JoogleMaps"><JoogleMaps lon={-97.740520}  lat={30.268884} /></div>
        </Modal>
    </div>
    )
  }
});

module.exports = DoctorFull;