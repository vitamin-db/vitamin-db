const combineReducers = require('redux').combineReducers;
const routerReducer = require('react-router-redux').routerReducer;
const test = require('./test');

const Reducer = combineReducers({
  test,
  routing: routerReducer
});

module.exports = Reducer;