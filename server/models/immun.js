const db = require('../db')
const Model = require('./model-helper')

const Immun = new Model('immun', ['id_immun', 'id_user', 'date', 'type', 'notes'])
module.exports = Immun

/* GET ALL BY USER
  Takes a user id
  Returns an array of all immunization records matching the user
*/
Immun.getAllByUser = function(id_user) {
	return this.findByAttribute('id_user', id_user)
}


/* GET MOST RECENT BY USER
  Takes a user ID
  Returns the most recently created immunizaiton record matching the user
*/
Immun.getMostRecentByUser = function(id_user) {
	return Immun.getAllByUser(id_user)
	.then( function(all) {
		return all.reduce(function(recent, curr) {
			return recent.id_immun > curr.id_immun ? recent : curr
		})
	})
}




/* PACKAGE ID USER
  Takes a username an an array of attributes
  Adds the id corresponding to the username to the attribute object as id_user
  Returns the attribute object
*/
Immun.packageUserId = function(username, attrs) {
	return User.findByUsername(username)
	  .then(function(user) {
	  	var withUser = {}
	  	for (var p in attrs) {
	  		withUser[p] = attrs[p]
	  	}
	  	withUser.id_user = user.id_user
	  	return withUser
	  })
}


/* CREATE AND RETURN
  Takes an object containing all attributes to add
  Creates this and returns it
*/
Immun.createAndReturn = function(attrs) {
	return this.create(attrs)
	  then(function() {
	  	return Immun.getMostRecentByUser(attrs.id_user)
	  })
}


/* PACKAGE CREATE AND RETURN
  Same as create and return, but adds the id_user based on the username passed in
*/
Immun.packageCreateReturn = function(username, attrs) {
	return Immun.packageUserId(username, attrs)
	  .then(function(allAttr) {
	  	return Immun.createAndReturn(attrs)
	  })
}




