const React = require('react');
const FormControls = require('react-bootstrap').FormControls.Static;

const UserProfile = () => {
  return(
  <form className="form-horizontal">
    <FormControls className="col-xs-10 col-xs-offset-2" value="I'm in a form" />
    <FormControls label="Username" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value="Billy" />
    <FormControls label="Password" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value="123" />
    <FormControls label="Computer Mail" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value="example@gmail.com" />
    <FormControls label="Them 10-Digits" labelClassName="col-xs-2" wrapperClassName="col-xs-10">1234567890</FormControls>
  </form>
  )
};

module.exports = UserProfile;