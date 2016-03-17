// require react packages
const React          = require('react');
const Router         = require('react-router');
const Link           = Router.Link;
const connect        = require('react-redux').connect;
// require action creators
const apiAction      = require('../actionCreators/apiActions');
const stateAction    = require('../actionCreators/stateActions');
// browser history for path change
const browserHistory = Router.browserHistory;

const Header = ({username, goHome, signOut, goProfile, goAppoint, signUp, logged, goSplash }) => {
	return (
	  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav nav-tabs">
          	  <li><h3>{username}</h3></li>
          	  <li><button onClick={goSplash}> LOGO </button></li>
	          <li role="presentation">{logged && <button onClick={goHome}> Home </button>}</li>
	          <li role="presentation">{logged && <button onClick={goProfile}> Profile </button>}</li>
	          <li role="presentation">{logged && <button onClick={goAppoint}> Appointments </button>}</li>
	          <li role="presentation">{logged && <button onClick={signOut}> Sign out </button>}</li>
	          <li role="presentation">{!logged && <button onClick={signUp}> Sign up </button>}</li>
          </ul>
        </div> 
	  </nav>
	);
};

const mapStateToProps = (state) => {

	console.log('header state', state)
	return {
		logged: apiAction.getCookie("token"),
		username: state.userinfo.user.username
	};
};

// currently doing this method because redirects/router changes trigger back end authentication where it checks for the body, url, and header
// not being able to set headers or body for a link led to problems
// putting it in the url for now until we find a better solution
// refreshes would trigger it too, so even though router could redirect me, bypassing the backend auth, if a user refreshes, it triggers the backend auth
// gotta see if server side can grab cookies
const mapDispatchToProps = (dispatch) => {
	return {
		goSplash: () => {
			browserHistory.push('/')
		},
		goHome: () => {
			if(apiAction.getCookie("token")){
				browserHistory.push('/home')
			}else{
				browserHistory.push('/')
			}
		},
		goProfile: () => {
			if(apiAction.getCookie("token")){
				browserHistory.push('/user')
			}else{
				browserHistory.push('/')
			}
		},
		goAppoint: () => {
			if(apiAction.getCookie("token")){
				browserHistory.push('/appointments')
			}else{
				browserHistory.push('/')
			}
		},
		signUp: () => {
			if(!apiAction.getCookie("token")){
				browserHistory.push('/signup')
			}
		},
		signOut: () => {
			dispatch(stateAction.SignOut());
			if(!apiAction.getCookie("token")){
				browserHistory.push('/')
			}
		}
	};
};

var wrappedHeader = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Header);

module.exports = wrappedHeader;