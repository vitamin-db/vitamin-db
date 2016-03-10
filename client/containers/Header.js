const React = require('react');
const connect = require('react-redux').connect;

const Header = ({ onSignIn }) => {
	return (
		<div>
			<ul className="nav nav-tabs">
				<li role="presentation" className="active"><a href="#">Home</a></li>
				<li role="presentation"><a href="#">Profile</a></li>
				<li role="presentation"><a href="#">Messages</a></li>
			</ul>
		</div>
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