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
const Pharmacy = require(__server + '/models/pharmacy')
const FamilyMember = require(__server + '/models/familymembers')

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

TH.PharmacyAttributes = function(id_user, business_name, address, phone, current) {
  this.id_user = id_user
  this.business_name = business_name
  this.address = address
  this.phone = phone
  this.current = current

TH.FamilyMemberAttributes = function(id_user, name) {
  this.id_user = id_user
  this.name = name

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
	var nonPwPropsMatch = Object.keys(sourceObj).reduce( function(soFar, current) {
		return current === 'password' ? true : soFar && (dbUser[current] === sourceObj[current])
	}, true)

	return User.passwordMatches(sourceObj.password, dbUser.password)
	  .then( function(result) {
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

//Creates a doctor and returns the full doctor object
TH.createDoctorReturnDoctor = function(attrs) {
	return Doctor.create(attrs)
	  .then( function(doctor) {
	  	return Doctor.findByName(doctor.name)
	  })
	  .then( function(doctor) {
	  	return doctor
	  })
}

//Creates a doctor and returns the ID
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

//Returns a boolean indicating whether every doctor in any array has all expected properties
TH.allValidDoctors = function(doctorArray) {
	return doctorArray.reduce( function(bool, current) {
		return bool && TH.isValidDoctor(current)
	}, true)
}

//Adds to a doctor with properties doctorAttrs to the doctors table
//Creates an entry in user_doctor with the passed-in user ID, usermade type, and current values,
  //and the id of the newly created doctor
//Returns the newly created doctor object
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

/* 
  ====================================
  Pharmacy helper methods
  ====================================
*/ 
TH.createPharmaReturnPharma = function(attrs) {
	return Pharmacy.create(attrs)
	  .then( function(attrs) {
	  	return db.select('*').from('pharmacy').where(attrs)
	  })
	  .then( function(hopefullyOnlyOneResult) {
	  	//we can't guarantee that any value will be unique, so we can't look up by any one value
	  	//instead, we'll return the matching entry with the highest primary key (the most recently created)
	  	return hopefullyOnlyOneResult.reduce( function(mostRecent, current) {
	  		return current.id_pharmacy > mostRecent.id_pharmacy ? current : mostRecent
	  	})[0]
	  })
}

TH.createPharmaReturnId = function(attrs) {
	return TH.createPharmaReturnPharma(attrs)
	  .then( function(pharmacy) {
	  	return pharmacy.id_pharmacy
	  })
}

TH.isValidPharma = function(attrs) {
	var props = ['id_pharmacy', 'id_user', 'business_name', 'address', 'phone', 'current']
	return TH.hasRightKeys(user, props)
}

TH.allValidPharmas = function(pharmacyArray) {
	return pharmacyArray.reduce( function(bool, current) {
		return bool && TH.isValidDoctor(current)
	}, true)
}



/* 
  ====================================
  Family Member helper methods
  ====================================
*/ 

//Returns a boolean indicating whether a family member object has the expected properties
TH.isValidFamilyMember = function(familymember) {
	var props = ['id_familymember', 'id_user', 'name']
	return TH.hasRightKeys(user, props)
}

//Returns a boolean indicating whether each family member object in an array has the expected properties
TH.allValidFamilyMembers = function(familyArray) {
	return familyArray.reduce( function(bool, current) {
		return bool && TH.isValidFamilyMember(current)
	})
}

//Adds a family member to the db and returns the newly created object
TH.createFamilyMemberReturnFamilyMember = function(attrs) {
	return FamilyMember.create(attrs)
	  .then( function(attrs) {
	  	return db.select('*').from('familymembers').where(attrs)
	  })
	  .then( function(hopefullyOnlyOne) { //since no guarantee non-primary-keys are unique
	  	return hopefullyOnlyOne.reduce( function(mostRecent, current) {
	  		return current.id_familymember > mostRecent.id_familymember ? current : mostRecent
	  	})
	  })
}

//Adds a family member to the database and returns the id of the newly created object
TH.createFamilyMemberReturnId = function(attrs) {
	return TH.createFamilyMemberReturnFamilyMember(attrs)
	  .then( function(familymember) {
	  	return familymember.id_familymember
	  })
}

