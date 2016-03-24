const db = require('../db')
const Model = require('./model-helper')
const Promise = require('bluebird')

const User = require('./user')
const Doctor = require('./doctor')

const UserDoctor = new Model('user_doctor', ['id_user_doctor', 'id_user', 'id_doctor', 'type_usermade', 'current'])

module.exports = UserDoctor

// METHODS DEFINED IN MODEL-HELPER

/* 
Dcctor.create = function(attrs)
  Takes attributes of new doctor and adds this doctor to the user_doctor table
  Returns the newly created entry
  For some reason, the timestamp etc is not working
  eg:
    UserDoct.create( {name: 'example_doctor_name', street_address: '123 street lane', city: 'austin', state_abbrev: 'tx', zip: 78751, email: 'mycooladdress@gmail.com', web: 'www.mycoolsite.com', phone: '9725438283', type: 'primary'} )
    => returns: {name: 'example_doctor_name',
                 street_address: '123 street lane', 
                 city: 'austin', 
                 state_abbrev: 'tx', 
                 zip: 78751, 
                 email: 'mycooladdress@gmail.com', 
                 web: 'www.mycoolsite.com', 
                 phone: '9725438283', 
                 type: 'primary'
                }
*/


/* UserDoctor.getAll = function()
  Returns an array of all user_doctor records
*/


/*
UserDoctor.findById = function(id)
  Takes a primary key as an argument
  Returns an object containing the user_doctor record with a matching primary key, or undefined if no entry has a matching primary key
  eg:
    UserDoctor.findById(3)
    => returns: {name: 'Doctor Smith',
                 street_address: '123 pecan rd', 
                 city: 'georgetown', 
                 state_abbrev: 'tx', 
                 zip: 78751, 
                 email: 'othercooladdress@gmail.com', 
                 web: 'www.sweetwebsite.com', 
                 phone: '3942049304', 
                 type: 'obgyn'
                }
*/

/* 
UserDoctor.deleteById = function(id)
  Takes a primary key as an argument
  Deletes the UserDoctor with that primary key from the database
  Returns the number of records deleted (1)
*/

//METHODS DEFINED HERE:

/*
  Returns an array of Doctor objects associated with one particular user
  // search id_user table to find all doctors associated with a particular user
  // map over resulting array to find full doctor object by ID (use .findByID from model-helper);
*/

UserDoctor.findAllDoctors = function(id){ // where id = id_user
  return this.findByAttribute('id_user', id)
    .then ( function(array) {
      return Promise.all(
        array.map(function(arrayItem) {
          return Doctor.findById(arrayItem.id_doctor)
        })
      )
    })
}

/*
  Returns an array of Doctor objects with a certain type
*/
UserDoctor.findAllDoctorsOfType = function(id, docType){
  return this.findByAttribute('id_user', id)
    .then (function(doctors) {
      return Promise.all(
        doctors.filter(function(doctor) {
          // console.log('(user-doctor.js): doctor in doctors.filter ', doctor)
          // console.log('(user-doctor.js): doctor.type in doctors.filter ', doctor.type)
          if (doctor.type_usermade === docType) {
            return true;
          }
        })
      )
    })
    .then ( function(doctorsOfType) {
      return Promise.all(
        doctorsOfType.map(function(doctor) {
          return Doctor.findById(doctor.id_doctor)
        })
      )
    })
}

/* CREATE DOCTOR
  Adds the doctor to the doctor table and creates a user-doctor relationship with id_user using type_usermade and current
  Returns the newly created doctor object from the doctors table
*/
UserDoctor.createDoctor = function(docAttrs, id_user, type_usermade, current) {
  var newDoctor = undefined

  return Doctor.create(docAttrs)
    .then(function(attrs) {
      return db.select('*').from('doctors').where(attrs)
    })
    .then(function(allMatching) {
      return allMatching.reduce(function(mostRecent, current) {
        return mostRecent.id_doctor > current.id_doctor ? mostRecent : current
      })
    })
    .then(function(newDoc) {
      newDoctor = newDoc
      return UserDoctor.create({id_user: id_user, id_doctor: newDoctor.id_doctor, type_usermade: type_usermade, current: current})
    })
    .then(function() {
      return newDoctor
    })
}

/* FIND ID
  Given a username and a doctor id, returns the corresponding id_user_doctor
*/
UserDoctor.findId = function(username, id_doctor) {
  return User.findByUsername(username)
    .then(function(user) {
      return db('user_doctor').select('*').where({id_user: user.id_user, id_doctor: id_doctor}) || user
      //returns undefined if no matches
    })
    .then(function(arr) {
      return arr.length > 0 ? arr[0].id_user_doctor : undefined
    })
}


/* DELETE USER DOCTOR
  Deletes all the userdoctor and any linked appointments
*/
UserDoctor.deleteUserDoctor = function(id_user_doctor) {

  return db('appointments').where({id_user_doctor: id_user_doctor}).del()
    .then(function() {
      return UserDoctor.deleteById(id_user_doctor)
    })

}

/* DELETE DOCTOR
  Deletes the doctor and all associated userdoctors and appointments
*/
UserDoctor.deleteDoctor = function(id_doctor) {
  return UserDoctor.findByAttribute('id_doctor', id_doctor)
    .then(function(userdocs) {
      return Promise.all(
        userdocs.map(userdoc => UserDoctor.deleteUserDoctor(userdoc.id_user_doctor))
      )
    })
    .then( function() {
      return Doctor.deleteById(id_doctor)
    })
}


/* UPDATE USERDOCTOR
  Takes the object sent in to req.body.properties
  Updates the doctor - if there's an error, won't update the UserDoctor
  Then updates the userdoctor
*/
UserDoctor.updateUserDoctor = function(username, reqObj) {

  var doc, needToUpdateDoc
  
  var udoc = {}
  var needToUpdateUserdoc = false

  return new Promise( function(resolve, reject) {
    doc = Doctor.prepData(reqObj) //this will throw an error if there is a data validation problem
    needToUpdateDoc = Object.keys(doc).length > 1 ? true : false

    if (reqObj.current !== undefined) {
      needToUpdateUserdoc = true
      udoc.current = reqObj.current
    }
    if (reqObj.type_usermade !== undefined) {
      needToUpdateUserdoc = true
      udoc.type_usermade = reqObj.type_usermade
    }
    resolve()
  })
  .then( function() {
    if (needToUpdateUserdoc) {
      return UserDoctor.findId(username, doc.id_doctor)
        .then(function(id) {
          return UserDoctor.updateById(id, udoc)
        })
    }
  })
  .then( function() {
    if (needToUpdateDoc) {
      return Doctor.updateByObj(doc)
    } else {
      return Doctor.findById(doc.id_doctor)
    }
  })
  .catch( function(err) {
    throw err
  })


}






