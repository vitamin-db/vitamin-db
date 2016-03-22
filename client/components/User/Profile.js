const React = require('react');
const FormControls = require('react-bootstrap').FormControls.Static;

const UserProfile = ({userInfo, email, phone}) => {
  console.log("UserProfile: ", {userInfo})
  return(
    <form className="form-horizontal">
      <FormControls className="col-xs-10 col-xs-offset-2" value="User's Profile View" />
      <FormControls label="Username" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={userInfo} />
      <FormControls label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value="add in when back-end is ready" />
      <FormControls label="Computer Mail" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={email} />
      <FormControls label="Them 10-Digits" labelClassName="col-xs-2" wrapperClassName="col-xs-10">{phone}</FormControls>
    </form>
  )
};
module.exports = UserProfile;
