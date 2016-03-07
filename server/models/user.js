const db = require('../db')
const Model = require('./model-helper')

const User = new Model('users', ['id_user', 'username', 'password', 'email', 'phone'])
module.exports = User

// METHODS DEFIEND IN MODEL-HELPER

/* 
User.create = function(attrs)

  Takes attributes of new user and adds this user to the users table
  Returns the newly created entry
  For some reason, the timestamp etc is not working
  eg:
    User.create( {username: 'example_user', password: 'example_pw', email: 'sample_email', phone: '111-111-1111'} )
    => returns: {id_user: somenumber,
                 username: 'example_user', 
                 password: 'example_pw', 
                 email: 'sample_email', 
                 phone: '111-111-1111',
                 created_at: null,
                 updated_at: null
                }
*/


/* User.getAll = function()
  Returns an array of all users
*/


/*
User.findById = function(id)

  Takes a primary key as an argument
  Returns an object containing the user with a matching primary key, or undefined if no entry has a matching primary key
  eg:
    User.findById(7)
    => returns: {id_user: 7,
                 username: 'seventh_user,
                 password: 'example_pw', 
                 email: 'sample_email', 
                 phone: '111-111-1111',
                 created_at: null,
                 updated_at: null
                }
*/

/* 
User.deleteById = function(id)

  Takes a primary key as an argument
  Deletes the user with that primary key from the database
  Returns the number of records deleted (1)

*/


//METHODS DEFINED HERE:


User.findByUsername = function(username) {
	return this.findByAttribute('username', username)
	.then( function(userArray) { return userArray[0] })
}
/* eg: User.findByUsername('bob')
  => returns: 
                   {id_user: 82,
                   username: 'bob'
                   password: 'bobspassword',
                   email: 'bob@bobcat.com',
                   phone: '111-111-1111',
                   created_at: null,
                   updated_at: null
                  }
    returns undefined if there is no user with username 'bob'
*/


User.findByEmail = function(email) {
	return this.findByAttribute('email', email)
	.then( function(userArray) { console.log('got userArray', userArray); return userArray[0] })
}
/* eg: User.findByEmail('bob@bobcat.com')
  => returns: 
                   {id_user: 82,
                   username: 'bob'
                   password: 'bobspassword',
                   email: 'bob@bobcat.com',
                   phone: '111-111-1111',
                   created_at: null,
                   updated_at: null
                  }
    returns undefined if there is no user with email 'bob@bobcat.com'
*/
