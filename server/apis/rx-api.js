// handles routes that start with /rx

const Rx = require('../models/rx')
const User = require('../models/user')
const SendR = require('../sendresponse')

const RxAPI = require('express').Router();

module.exports = RxAPI


/* GET /rx
  Returns an array of all prescriptions associated with the user
*/
RxAPI.get('/', function(req, res) {
return User.findByUsername( req.decoded.username )
  .then(function(user) {
    return Rx.getAllByUser(user.id_user)
  })
  .then(function(rxArray) {
  	var public = rxArray.map( rx => Rx.getPublicOb(rx))
    SendR.resData(res, 200, public)
  })
  .catch( function(err) {
    SendR.error(res, 500, 'Server error getting rx records', err)
  })
})