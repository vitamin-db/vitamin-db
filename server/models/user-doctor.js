const db = require('../db')
const Model = require('./model-helper')

const UserDoctor = new Model('user_doctor', ['id_user', 'id_doctor', 'type_usermade' ])
const User = new Model('users', ['id_user', 'username', 'password', 'email', 'phone'])
const Doctor = new Model('doctors', ['id_doctor', 'name', 'street_address', 'city', 'state_abbrev', 'zip', 'email', 'web', 'phone', 'type'])

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
          console.log('(user-doctor.js): doctor in doctors.filter ', doctor)
          console.log('(user-doctor.js): doctor.type in doctors.filter ', doctor.type)
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



