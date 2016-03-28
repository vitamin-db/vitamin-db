const combineReducers = require('redux').combineReducers;
const routerReducer   = require('react-router-redux').routerReducer;
const signin          = require('./SignIn');
const docapi		  = require('./DocApiList');
const userinfo        = require('./UserInfo');
const allergy		  = require('./Allergy');
const appoint		  = require('./Appointment');
const family		  = require('./Family');
const immun		  = require('./Immunization');
const insurance		  = require('./Insurance');
const pharmacy		  = require('./Pharmacy');
const rx 			  = require('./RX');

// combineReducers function is called to combine all relavent reducers
// and have it connect to the store when the store is creaed
const Reducer = combineReducers({
  docapi,
  userinfo,
  signin,
  allergy,
  appoint,
  family,
  immun,
  insurance,
  pharmacy,
  rx,
  routing: routerReducer
});

module.exports = Reducer;