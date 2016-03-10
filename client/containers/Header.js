const React = require('react');
const Router = require('react-router');
const Link = Router.Link;
const connect = require('react-redux').connect;

const Header = () => {
	return (
	  <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav nav-tabs">
	          <li role="presentation"><a href="/home">Home</a></li>
	          <li role="presentation"><a href="/user">Profile</a></li>
	          <li role="presentation"><a href="/appointments">Appointments</a></li>
	          <li role="presentation"><a href="">Sign Out</a></li>
          </ul>
        </div> 
	  </nav>
	);
};

const mapStateToProps = (state) => {
	return {
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
	};
};

var wrappedHeader = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Header);

module.exports = wrappedHeader;