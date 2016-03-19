// require react packages
const React          = require('react');

const Navbar = require('react-bootstrap/lib/Navbar')
const NavbarHeader = require('react-bootstrap/lib/NavbarHeader')
const NavbarToggle = require('react-bootstrap/lib/NavbarToggle')
const NavbarCollapse = require('react-bootstrap/lib/NavbarCollapse')
const Nav = require('react-bootstrap/lib/').Nav;
const NavItem = require('react-bootstrap/lib/NavItem')
const NavbarBrand = require('react-bootstrap/lib/NavbarBrand')


const Router         = require('react-router');
const Link           = Router.Link;
const connect        = require('react-redux').connect;
// require action creators
const apiAction      = require('../actionCreators/apiActions');
const stateAction    = require('../actionCreators/stateActions');
// browser history for path change
const browserHistory = Router.browserHistory;


const Header = ({check, username, goHome, signOut, goProfile, goAppoint, signUp, logged, goSplash }) => {
	check();
	return (
		<Navbar>

			<span>{ logged && <p className="nav-welcome">Welcome, {username}!</p> }</span>

	    <Nav>
          <NavItem><button bsStyle="primary" onClick={goSplash}> Vitamin DB </button></NavItem>
          <NavItem role="presentation">{logged && <button bsStyle="primary" onClick={goHome}> Dashboard </button>}</NavItem>
          <NavItem role="presentation">{logged && <button bsStyle="primary" onClick={goAppoint}> Appointments </button>}</NavItem>
    	</Nav>

    	<Nav pullRight>
    		<NavItem role="presentation">{logged && <button bsStyle="primary" onClick={goProfile}> Account </button>}</NavItem>
    		<NavItem role="presentation">{logged && <button bsStyle="primary" onClick={signOut}> Sign out </button>}</NavItem>
        <NavItem role="presentation">{!logged && <button bsStyle="primary" onClick={signUp}> Sign up </button>}</NavItem>
    	</Nav>

    </Navbar>
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
		check: () => {
			if(apiAction.getCookie("token")){
				dispatch(apiAction.GetMyInfo())
			}
		},
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