const React = require('react');
const connect = require('react-redux').connect;
const Panel = require('../components/HomePage/PanelGrid');

const Home = () => {
  return (
  <div>
    <Panel />
  </div>
  );
};

const mapStateToProps = (state) => {
  return {

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