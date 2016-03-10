const React = require('react');
const connect = require('react-redux').connect;

const Profile = () => {
  return (
    <div>
      <h1>User's Profile view</h1>
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

var wrappedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

module.exports = wrappedProfile;