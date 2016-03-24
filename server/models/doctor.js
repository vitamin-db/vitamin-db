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



/* VALIDATE EMAIL
  Throws an error ('Invalid email address') if the email passed in is invalid
  Otherwise, just returns the email address
*/
Doctor.validateEmail = function(emailAddress) {
  console.log('valid email address? ', emailAddress, Doctor.validEmail(emailAddress))
  if (!Doctor.validEmail(emailAddress)) {
    throw new Error('Invalid email address')
  } else {
    return emailAddress
  }
}


/* VALIDATE ZIP
  Throws an error ('Invalid zip code')if the zip code passed in is invalid
  Otherwise, returns the integerized zip code (if the zip code was a string for some reason)
*/
Doctor.validateZip = function(zipcode) {
  console.log('valid zip code?', zipcode, Doctor.isNumber(zipcode))
  if (Doctor.isNumber(zipcode)) {
    return Doctor.getInt(zipcode)
  } else {
    throw new Error('Invalid zip code')
  }
}



/* VALIDATE REQUEST
  Takes the object sent in req.body.properties
  Validates the email and zip (if passed in) - throws an error if those are invalid
  Removes the 'current' and 'type_usermade'
  Returns the object with the zip coerced to an integer (if it wasn't to begin with)
*/
Doctor.prepData = function(reqObj) {
  console.log('original req object in prepData', reqObj)
  var prepared = {}

  for (var p in reqObj) {
    if (p !== 'type_usermade' && p !== 'current') {

      if (p === 'email') {
        prepared[p] = Doctor.validateEmail(reqObj[p])
      } else if (p === 'zip') {
        prepared[p] = Doctor.validateZip(reqObj[p])
      } else {
        prepared[p] = reqObj[p]
      }

    }
  }
  console.log('prepared object in prepData', reqObj)
  return prepared
}





