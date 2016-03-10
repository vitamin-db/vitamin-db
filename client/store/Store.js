const createStore = require('redux').createStore;
const compose = require('redux').compose;
const reducer = require('../reducers/reducer');

// create a store with the combined reducers as the argument
// this connects the two. Simply return the created store to use in the Provider route
module.exports = () => {
  // const finalCreateStore = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
  // const store = finalCreateStore(reducer);
  const store = createStore(reducer);
  return store;
};