const createStore = require('redux').createStore;
const compose = require('redux').compose;
const applyMiddleware = require('redux').applyMiddleware;
const reducer = require('../reducers/reducer');
const thunk = require('redux-thunk');

// create a store with the combined reducers as the argument
// this connects the two. Simply return the created store to use in the Provider route
module.exports = () => {
  const finalCreateStore = compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
  const store = finalCreateStore(reducer, {}, applyMiddleware(thunk.default));
  // const store = createStore(reducer, {}, applyMiddleware(thunk.default));
  return store;
};
