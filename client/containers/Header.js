// require react packages
const React          = require('react');

const Navbar         = require('react-bootstrap/lib/Navbar')
const NavbarHeader   = require('react-bootstrap/lib/NavbarHeader')
const NavbarToggle   = require('react-bootstrap/lib/NavbarToggle')
const NavbarCollapse = require('react-bootstrap/lib/NavbarCollapse')
const Nav            = require('react-bootstrap/lib/').Nav;
const NavItem        = require('react-bootstrap/lib/NavItem')
const NavbarBrand    = require('react-bootstrap/lib/NavbarBrand')


const Router         = require('react-router');
const Link           = Router.Link;
const connect        = require('react-redux').connect;
// require action creators
const userAction     = require('../actionCreators/userActions');
const stateAction    = require('../actionCreators/stateActions');
// browser history for path change
const browserHistory = Router.browserHistory;


const Header = ({username, goHome, signOut, goProfile, goAppoint, signUp, logged, goSplash }) => {
	return (
		<Navbar>

			<span>{logged && <p className="nav-welcome">Welcome, {username}!</p> }</span>

	    <NavbarHeader>
    		<NavbarBrand>
        	<a onClick={goSplash}> Vitamin DB </a>
        </NavbarBrand>
        <NavbarToggle />
      </NavbarHeader>

      <NavbarCollapse>
	      <Nav>
	          {logged && <NavItem className="hvr-sweep-to-top" onClick={goHome}> Dashboard </NavItem>}
	          {logged && <NavItem className="hvr-sweep-to-top" onClick={goAppoint}> Appointments </NavItem>}
	    	</Nav>

	    	<Nav pullRight>
	    		{logged && <NavItem className="hvr-sweep-to-top" onClick={goProfile}> Account </NavItem>}
	    		{logged && <NavItem className="hvr-sweep-to-top" onClick={signOut}> Sign out </NavItem>}
	        	{!logged && <NavItem className="hvr-sweep-to-top" onClick={signUp}> Sign up </NavItem>}
	    	</Nav>
	    </NavbarCollapse>
    </Navbar>
	);
};

const mapStateToProps = (state) => {
	console.log('header state', state)
	return {
		logged: state.signin.logged,
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
			if(userAction.getCookie("token")){
				browserHistory.push('/home')
			}else{
				browserHistory.push('/')
			}
		},
		goProfile: () => {
			if(userAction.getCookie("token")){
				browserHistory.push('/user')
			}else{
				browserHistory.push('/')
			}
		},
		goAppoint: () => {
			if(userAction.getCookie("token")){
				browserHistory.push('/appointments')
			}else{
				browserHistory.push('/')
			}
		},
		signUp: () => {
			if(!userAction.getCookie("token")){
				browserHistory.push('/signup')
			}
		},
		signOut: () => {
			dispatch(stateAction.SignOut())
			if(!userAction.getCookie("token")){
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