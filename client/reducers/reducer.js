const combineReducers = require('redux').combineReducers;
const routerReducer   = require('react-router-redux').routerReducer;
const signin          = require('./SignIn');
// const signup       = require('./SignUp');

// combineReducers function is called to combine all relavent reducers
// and have it connect to the store when the store is creaed
const Reducer = combineReducers({
  // signup, // going to get rid of this reducer, using signin for signup user state
  signin,
  routing: routerReducer
});

module.exports = Reducer;