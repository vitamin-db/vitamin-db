const combineReducers = require('redux').combineReducers;
const routerReducer   = require('react-router-redux').routerReducer;
const signin          = require('./SignIn');
const docapi		  = require('./DocApiList');
const userinfo        = require('./UserInfo');
const allergy		  = require('./Allergy');

// combineReducers function is called to combine all relavent reducers
// and have it connect to the store when the store is creaed
const Reducer = combineReducers({
  docapi,
  userinfo,
  signin,
  allergy,
  routing: routerReducer
});

module.exports = Reducer;