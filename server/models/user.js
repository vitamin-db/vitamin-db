const db = require('../db')
const Model = require('./model-helper')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const jwt = require('jsonwebtoken')

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

/* 
  This is like the generic Model.create, but hashes the password before storing it
*/
User.createUser = function(attrs) {
  return bcrypt.genSaltAsync(10)
    .then( function(salt) {
      console.log('got salt', salt)
      return bcrypt.hashAsync(attrs.password, salt, null)
    })
    .then( function(hash) {
      console.log('hash', hash)
      var newUserObj = attrs
      newUserObj.password = hash
      return User.create(newUserObj)
    })
    .catch( function(err) {
      console.log('error hashing password', err)
    })
}

/*
 Compares passed-in password to the stored hash
  eg: If Alice's password is 'mynameisnotbob' hashes to 'ajt894gjoq4tgjao', then:
    User.passwordMatches('mynameisnotbob', 'ajt894gjoq4tgjao')
      => returns true
    User.passwordMatches('alicesfakepassword, 'ajt894gjoq4tgjao')
      => returns false
*/
User.passwordMatches = function(enteredPw, storedHash) {
  return bcrypt.compareAsync(enteredPw, storedHash)
    .catch( function(error) {
      return error instanceof bcrypt.MISMATCH_ERROR ? false : error
    })
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
User.findByUsername = function(username) {
	return this.findByAttribute('username', username)
	.then( function(userArray) { return userArray[0] })
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
User.findByEmail = function(email) {
	return this.findByAttribute('email', email)
	.then( function(userArray) { console.log('got userArray', userArray); return userArray[0] })
}



/*
  Returns a boolean indicating whether the passed-in password matches the password on record
*/
User.validPassword = function(username, password) {
  return this.findByUsername(username)
    .then( function(userInfo) {
      return User.passwordMatches(password, userInfo.password)
    })
}

/*
  Returns a boolean indicating whether the username exists in the database
*/
User.existsByUsername = function(username) {
  return this.existsByAttribute('username', username)
}

