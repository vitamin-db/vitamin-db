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
}

TH.FamilyMemberAttributes = function(id_user, name) {
  this.id_user = id_user
  this.name = name
}

TH.FamilyHistoryAttributes = function(id_familymember, condition) {
	this.id_familymember = id_familymember
	this.condition = condition
}

TH.InsuranceAttributes = function(id_user, plan_name, group_id, plan_id, rx_bin, current) {
	this.id_user = id_user
	this.plan_name = plan_name
	this.group_id = group_id
	this.plan_id = plan_id
	this.rx_bin = rx_bin
	this.current = current
}

TH.EyeRxAttributes = function(id_user, sphere_right, sphere_left, cylinder_right, cylinder_left, axis_right, axis_left, add_right, add_left, current) {
  this.id_user = id_user
  this.sphere_right = sphere_right
  this.sphere_left = sphere_left
  this.cylinder_right = cylinder_right
  this.cylinder_left = cylinder_left
  this.axis_right = axis_right
  this.axis_left = axis_left
  this.add_right = add_right
  this.add_left = add_left
  this.current = current
}

TH.RxAttributes = function(id_user, id_pharmacy, id_doctor, refill_number, name, dosage, current) {
	this.id_user = id_user
	this.id_pharmacy = id_pharmacy
	this.id_doctor = id_doctor
	this.refill_number = refill_number
	this.name = name
	this.dosage = dosage
	this.current = current
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
	  	})
	  })
}

TH.createPharmaReturnId = function(attrs) {
	return TH.createPharmaReturnPharma(attrs)
	  .then( function(pharmacy) {
	  	var a = pharmacy.id_pharmacy
	  	return a
	  })
}

TH.isValidPharma = function(pharma) {
	var props = ['id_pharmacy', 'id_user', 'business_name', 'address', 'phone', 'current']
	return TH.hasRightKeys(pharma, props)
}

TH.allValidPharmas = function(pharmacyArray) {
	return pharmacyArray.reduce( function(bool, current) {
		return bool && TH.isValidPharma(current)
	}, true)
}



/* 
  ====================================
  Insurance helper methods
  ====================================
*/ 

TH.isValidInsurance = function(insurance) {
	var props = ['id_insurance', 'id_user', 'plan_name', 'group_id', 'plan_id', 'rx_bin', 'current']
	return TH.hasRightKeys(insurance, props)
}

//Returns a boolean indicating whether every doctor in any array has all expected properties
TH.allValidRx = function(rxArray) {
	return rxArray.reduce( function(bool, current) {
		return bool && TH.isValidRx(current)
	}, true)
}


TH.createRxReturnRx = function(attrs) {
	return Rx.create(attrs)
	  .then( function(attrs) {
	  	return db.select('*').from('rx').where(attrs)
	  })
	  .then( function(hopefullyOnlyOneResult) {
	  	return hopefullyOnlyOneResult.reduce( function(mostRecent, current) {
	  		return current.id_rx > mostRecent.id_rx ? current : mostRecent
	  	})[0]
	  })
}

TH.createRxReturnId = function(attrs) {
	return TH.createRxReturnRx(attrs)
	  .then( function(rx) {
	  	return rx.id_rx
	  })
}

/* 
  ====================================
  Family Member helper methods
  ====================================
*/ 

//Returns a boolean indicating whether a family member object has the expected properties
TH.isValidFamilyMember = function(familymember) {
	var props = ['id_familymember', 'id_user', 'name']
	return TH.hasRightKeys(familymember, props)
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

/* 
  ====================================
  Family History helper methods
  ====================================
*/ 

//Returns a boolean indicating whether a family history object has the expected properties
TH.isValidFamilyHistory = function(familyhistory) {
	var props = ['id_familyhistory', 'id_familymember', 'condition']
	return TH.hasRightKeys(familyhistory, props)
}

//Returns a boolean indicating whether each family history object in an array has the expected properties
TH.allValidFamilyHistory = function(familyArray) {
	return familyArray.reduce( function(bool, current) {
		return bool && TH.isValidFamilyHistory(current)
	})
}

//Adds a family history record to the db and returns the newly created object
TH.createFamilyHistoryReturnFamilyHistory = function(attrs) {
	return FamilyHistory.create(attrs)
	  .then( function(attrs) {
	  	return db.select('*').from('familyhistory').where(attrs)
	  })
	  .then( function(hopefullyOnlyOne) { //since no guarantee non-primary-keys are unique
	  	return hopefullyOnlyOne.reduce( function(mostRecent, current) {
	  		return current.id_familyhistory > mostRecent.id_familyhistory ? current : mostRecent
	  	})
	  })
}

//Adds a family history instance to the database and return the id of the newly created object
TH.createFamilyHistoryReturnId = function(attrs) {
	return TH.createFamilyHistoryReturnFamilyHistory(attrs)
	  .then( function(familyhistory) {
	  	return familyhistory.id_familyhistory
	  })
}



/* 
  ====================================
  Eyerx helper methods
  ====================================
*/ 

TH.isValidEyerx = function(Eyerx) {
	var props = ['id_eyerx', 'id_user', 'sphere_right', 'sphere_left', 'cylinder_right', 'cylinder_left', 'axis_right', 'axis_left', 'add_right', 'add_left', 'current']
	return TH.hasRightKeys(user, props)
}

/* 
  ====================================
  Rx Helper Methods
  ====================================
*/ 

TH.isValidRx = function(rx) {
  var props = ['id_rx', 'id_user', 'id_pharmacy', 'id_doctor', 'refill_number', 'name', 'dosage', 'current']
  return TH.hasRightKeys(user, props)
}

//Returns a boolean indicating whether every doctor in any array has all expected properties
TH.allValidRx = function(rxArray) {
  return rxArray.reduce( function(bool, current) {
    return bool && TH.isValidRx(current)
  }, true)
}


TH.createRxReturnRx = function(attrs) {
  return Rx.create(attrs)
    .then( function(attrs) {
      return db.select('*').from('rx').where(attrs)
    })
    .then( function(hopefullyOnlyOneResult) {
      return hopefullyOnlyOneResult.reduce( function(mostRecent, current) {
        return current.id_rx > mostRecent.id_rx ? current : mostRecent
      })[0]
    })
}

TH.createRxReturnId = function(attrs) {
  return TH.createRxReturnRx(attrs)
    .then( function(rx) {
      return rx.id_rx
    })
}

