const React = require('react');
const connect = require('react-redux').connect;
const PanelGrid = require('../components/HomePage/PanelGrid');
const mock = require('../model/mockData');
const Grid = require('react-bootstrap').Grid;

//Grid
//Row might go in Home instead components
//
// // CONTAINER

const Home = ({doctor}) => {
  return (
    <div className="home-body">
    <PanelGrid docInfo={doctor} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps)
  // console.log(mock)
  return { 
   doctor: mock.Doctor
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

var wrappedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = wrappedHome;