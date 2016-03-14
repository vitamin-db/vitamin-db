const React = require('react');
const Router = require('react-router');
const Link = Router.Link;
const connect = require('react-redux').connect;
const apiAction = require('../actionCreators/apiActions');
const stateAction = require('../actionCreators/stateActions');

const Header = ({ goHome, signOut, goProfile, goAppoint }) => {
	return (
	  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav nav-tabs">
          	  <li><h3>LOGO</h3></li>
	          <li role="presentation">{apiAction.isAuth() && <button onClick={goHome}>Home</button>}</li>
	          <li role="presentation">{apiAction.isAuth() && <button onClick={goProfile} >Profile</button>}</li>
	          <li role="presentation">{apiAction.isAuth() && <button onClick={goAppoint} >Appointments</button>}</li>
	          <li role="presentation">{apiAction.isAuth() && <button onClick={signOut} >Sign out</button>}</li>
          </ul>
        </div> 
	  </nav>
	);
};

const mapStateToProps = (state) => {
	// console.log('header state', state)
	return {
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		goHome: () => {
			if(apiAction.isAuth()){
				location.assign('/home')
			}else{
				console.log("FAIL")
			}
		},
		goProfile: () => {
			if(apiAction.isAuth()){
				location.assign('/profile')
			}else{
				console.log("FAIL")
			}
		},
		goAppoint: () => {
			if(apiAction.isAuth()){
				location.assign('/appointments')
			}else{
				console.log("FAIL")
			}
		},
		signOut: () => {
			dispatch(stateAction.SignOut());
			location.assign('/')
		}
	};
};

var wrappedHeader = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Header);

module.exports = wrappedHeader;