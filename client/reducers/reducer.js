const combineReducers = require('redux').combineReducers;
const routerReducer = require('react-router-redux').routerReducer;
const test = require('./test');

// combineReducers function is called to combine all relavent reducers
// and have it connect to the store when the store is creaed
const Reducer = combineReducers({
  test,
  routing: routerReducer
});

module.exports = Reducer;