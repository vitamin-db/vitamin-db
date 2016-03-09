const createStore = require('redux').createStore;
const reducer = require('../reducers/reducer');

module.exports = () => {
	const store = createStore(reducer);
	return store;
};