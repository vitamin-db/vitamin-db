const React = require('react');
const connect = require('react-redux').connect;

// components
const UserProfile = require('../components/User/Profile');

// actions
const userAction = require('../actionCreators/userActions');

const Profile = ({userInfo, email, phone, editInfo}) => {
  return (
    <div>
      <UserProfile userInfo={userInfo} email={email} phone={phone} editInfo={editInfo}  />
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log("ProfileViewState: ", state)
  return {
    userInfo: state.userinfo.user.username,
    email: state.userinfo.user.email,
    phone: state.userinfo.user.phone
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    editInfo: (e) => {
      e.preventDefault();
      var username = e.target.username.value;
      var phone = e.target.phone.value;
      var email = e.target.email.value;
      var password = e.target.password.value;
      var newInfo = { properties: {} };
      if(username){
        newInfo.properties.username = username;
      }
      if(phone){
        newInfo.properties.phone = phone;
      }
      if(email){
        newInfo.properties.email = email;
      }
      if(password){
        newInfo.properties.password = password;
      }
      dispatch(userAction.ChangeUserInfo(newInfo))
    }
  }
};
var wrappedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
module.exports = wrappedProfile
