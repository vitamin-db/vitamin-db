const db = require('../db')
const Model = require('./model-helper')

const Doctor = new Model('doctors', ['id_doctor', 'name', 'street_address', 'city', 'state_abbrev', 'zip', 'email', 'web', 'phone', 'type'])
module.exports = Doctor

// METHODS DEFINED IN MODEL-HELPER

/* 
Dcctor.create = function(attrs)
  Takes attributes of new doctor and adds this doctor to the doctors table
  Returns the newly created entry
  For some reason, the timestamp etc is not working
  eg:
    Doctor.create( {name: 'example_doctor_name', street_address: '123 street lane', city: 'austin', state_abbrev: 'tx', zip: 78751, email: 'mycooladdress@gmail.com', web: 'www.mycoolsite.com', phone: '9725438283', type: 'primary'} )
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


/* Doctor.getAll = function()
  Returns an array of all doctors
*/


/*
Doctor.findById = function(id)
  Takes a primary key as an argument
  Returns an object containing the doctor with a matching primary key, or undefined if no entry has a matching primary key
  eg:
    Doctor.findById(3)
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
Doctor.deleteById = function(id)
  Takes a primary key as an argument
  Deletes the doctor with that primary key from the database
  Returns the number of records deleted (1)
*/

//METHODS DEFINED HERE:

  /* FIND BY NAME
    Returns an object from the table where the doctor name matches the name passed in
    If the entry does not exist, returns undefined
  */

 Doctor.findByName = function(name) {
  return this.findByAttribute('name', name)
  .then( function(doctorArray) { return doctorArray[0] })
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

