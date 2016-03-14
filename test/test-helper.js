process.env.NODE_ENV = 'test'

//Store the location of the server and client folders
global.__server = __dirname + '/../server'
global.__client = __dirname + '/../client'
global.__test = __dirname + '/../test'

//Dependencies
const db = require(__server + '/db')
const request = require('supertest-as-promised')

//Models and APIs
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')

//Make chai's 'expect' accessible from everywhere
var chai = require('chai')
global.expect = chai.expect
//Could instead make everything should-able:
  // chai.should()

//
//Helper Functions
//

TH = {}
module.exports = TH

//
//Exportable function setting up app for testing
//

var express = require('express')

TH.createApp = function(loader) {

	var app = express()
	app.use(require('body-parser').json())

	app.testReady = function() {
		//Log errors
		app.use(function(err, req, res, next) {
			console.error('==Error==')
			console.error(' ' + err.stack)
			next(err)
		})
	}

	return app

}

/*
  MODEL ATTRIBUTES
*/
TH.UserAttributes = function(username, password, email, phone) {
	this.username = username
	this.password = password
	this.email = email
	this.phone = phone
}

TH.DoctorAttributes = function(name, street_address, city, state_abbrev, zip, email, web, phone, type) {
	this.name = name
	this.street_address = street_address
	this.city = city
	this.state_abbrev = state_abbrev
	this.zip = zip
	this.email = email
	this.web = web
	this.phone = phone
	this.type = type
}

TH.UserDoctorAttributes = function(id_user, id_doctor, type_usermade, current) {
  this.id_user = id_user;
  this.id_doctor = id_doctor;
  this.type_usermade = type_usermade;
  this.current = current;
}

/*
  Generic Functions: These do not have any table- or model-specific calls
*/

//Returns a boolean indicating whether the obj has all of the keys in arrayOfKeys, and no more
TH.hasRightKeys = function(obj, arrayOfKeys) {
	var k = Object.keys(obj)
	return k.length === arrayOfKeys.length && arrayOfKeys.reduce( function(foundAll, current) {
		return foundAll && k.indexOf(current) > -1
	}, true)
}

//Returns a boolean indicating whether every key:value pair in has been successfully added to the database object
TH.propsMatch = function(dbObj, sourceObj) {
	return Object.keys(sourceObj).reduce( function(bool, current) {
		return bool && sourceObj[current] === dbObj[current]
	}, true)
}


/* 
  ====================================
  User helper methods
  ====================================
*/ 

//Returns a boolean indicating whether user object has all properties that should be stored in the db
TH.isValidUser = function(user) {
	var props = ['id_user', 'username', 'password', 'email', 'phone', 'created_at', 'updated_at']
	return TH.hasRightKeys(user, props)
}

//Returns a boolean indicating whether user object has all properties we want to send to the client
TH.isValidPublicUser = function(user) {
	var props = ['username', 'email', 'phone']
	return TH.hasRightKeys(user, props)
}

//Returns a Promise obj that returns boolean indicating whether the db object has the correct values
TH.userPropsMatch = function(dbUser, sourceObj) {
	console.log('in db: ', dbUser, 'source', sourceObj)
	var nonPwPropsMatch = Object.keys(sourceObj).reduce( function(soFar, current) {
		console.log('comparing', dbUser[current],'against', sourceObj[current])
		return current === 'password' ? true : soFar && (dbUser[current] === sourceObj[current])
	}, true)
	console.log('non pw props match? ', nonPwPropsMatch)

	return User.passwordMatches(sourceObj.password, dbUser.password)
	  .then( function(result) {
	  	console.log('result of pwMatches', result)
	  	return result && nonPwPropsMatch
	  })
}

// Creates a User and returns the username
TH.createUserReturnUsername = function(attrs) {
	return User.createUser(attrs)
	  .then( function(user) {
	  	return user.username
	  })
}

//Creates a User - returns the full user object
TH.createUserReturnUser = function(attrs) {
	return User.createUser(attrs)
	  .then( function(user) {
	  	return User.findByUsername(user.username)
	  })
}

//Creates a User - returns the id
TH.createUserReturnId = function(attrs) {
	return TH.createUserReturnUser(attrs)
	  .then( function(user) {
	  	return user.id_user
	  })
}

// //Creates a user without encrypting the password - returns the username
// TH.createUserNoEncryptReturnUsername = function(attrs) {
// 	return User.create(attrs)
// 	  .then( function(user) {
// 	  	return user.username
// 	  })
// }

// //Creates a user without encrypting the password - returns the full user object
// TH.createUserNoEncryptReturnUser = function(attrs) {
// 	return User.create(attrs)
// 	  .then( function(user) {
// 	  	return User.findByUsername(user.username)
// 	  })
// }

// //Creates a User without encrypting the password - returns the id
// TH.createUserNoEncryptReturnId = function(attrs) {
// 	return TH.createUserNoEncryptReturnUser(attrs)
// 	  .then( function(user) {
// 	  	return user.id_user
// 	  })
// }

/* 
  ====================================
  Doctor helper methods
  ====================================
*/ 

//Returns a boolean indicating whether doctor object has all properties that should be stored in the db
TH.isValidDoctor = function(doctor) {
	var props = ['id_doctor', 'name', 'street_address', 'city', 'state_abbrev', 'zip', 'email', 'web',
	             'phone', 'type', 'created_at', 'updated_at']
	return TH.hasRightKeys(doctor, props)
}

TH.createDoctorReturnDoctor = function(attrs) {
	return Doctor.create(attrs)
	  .then( function(doctor) {
	  	return Doctor.findByName(doctor.name)
	  })
	  .then( function(doctor) {
	  	return doctor
	  })
}

TH.createDoctorReturnId = function(attrs) {
	return TH.createDoctorReturnDoctor(attrs)
	  .then( function(doctor) {
	  	return doctor.id_doctor
	  })
}

/* 
  ====================================
  User-Doctor helper methods
  ====================================
*/ 

TH.allValidDoctors = function(doctorArray) {
	return doctorArray.reduce( function(bool, current) {
		return bool && TH.isValidDoctor(current)
	}, true)
}

TH.createUserdoctorReturnDoctor = function(userId, doctorAttrs, type_usermade, current) {
	var createdDoctor = undefined

	return TH.createDoctorReturnDoctor(doctorAttrs)
	  .then( function(doctor) {
	  	createdDoctor = doctor
	  	var userDocAttrs = new TH.UserDoctorAttributes(userId, doctor.id_doctor, type_usermade, current)
	  	return UserDoctor.create(userDocAttrs)
	  })
	  .then( function() {
	  	return createdDoctor
	  })
}
