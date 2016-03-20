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

	    <NavbarHeader>
    		<NavbarBrand>
        	<NavItem onClick={goSplash}> Vitamin DB </NavItem>
        </NavbarBrand>
        <NavbarToggle />
      </NavbarHeader>

      <NavbarCollapse>
	      <Nav>
	          {logged && <NavItem onClick={goHome}> Dashboard </NavItem>}
	          {logged && <NavItem onClick={goAppoint}> Appointments </NavItem>}
	    	</Nav>

	    	<Nav pullRight>
	    		{logged && <NavItem onClick={goProfile}> Account </NavItem>}
	    		{logged && <NavItem onClick={signOut}> Sign out </NavItem>}
	        {!logged && <NavItem className="hvr-sweep-to-top" onClick={signUp}> Sign up </NavItem>}
	    	</Nav>
	    	</NavbarCollapse>
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