const React = require('react');
const connect = require('react-redux').connect;

const Header = ({ onSignIn }) => {
	return (
		<div>
			<h1>Header</h1>
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