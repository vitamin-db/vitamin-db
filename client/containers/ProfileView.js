const React = require('react');
const connect = require('react-redux').connect;

const UserProfile = require('../components/User/Profile');

const Profile = ({userInfo, email, phone}) => {
  return (
    <div>
      <UserProfile userInfo={userInfo} email={email} phone={phone}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.userinfo.user.username,
    email: state.userinfo.user.email,
    phone: state.userinfo.user.phone
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
module.exports = wrappedProfile
