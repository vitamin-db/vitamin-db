const React = require('react');
const connect = require('react-redux').connect;

const UserProfile = require('../components/User/Profile');

const Profile = () => {
  return (
    <div>
      <h1>User's Profile view</h1>
      <UserProfile />
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("ProfileView state: ", state)
  return {
  }
};
const mapDispatchToProps = (dispatch) => {
  console.log("ProfileView dispatch: ", dispatch)
  return {
  }
};
var wrappedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
module.exports = wrappedProfile