const db = require('../db')
const Model = require('./model-helper')

const User = new Model('users', ['id_user', 'username', 'password', 'email', 'phone'])
module.exports = User

//User.create(attrs)

User.findByUsername = function(username) {
	return this.findByAttribute('username', username)
	.then( function(userArray) { console.log('got userArray', userArray); return userArray[0] })
}

User.findByEmail = function(email) {
	return this.findByAttribute('email', email)
	.then( function(userArray) { console.log('got userArray', userArray); return userArray[0] })
}