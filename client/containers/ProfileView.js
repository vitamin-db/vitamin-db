const React = require('react');
const connect = require('react-redux').connect;

const Profiler = require('../components/User/Profile');

const Profile = ({info}) => {
  return (
    <div>
      <h1>User's Profile view</h1>
      <Profiler userInfo={info}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    info: 'test'
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