require(TEST_HELPER)

const db = require(__server + '/db')
const request = require('supertest-as-promised')

// EYERX MODEL WRITTEN YET
const EyeRx = require(__server + '/models/eyerx')
const User = require(__server + '/models/user')


describe('**************** EyeRx Model ****************', function() {

  beforeEach(function() {
    return db.deleteEverything()
  })

  var UserAttributes = function(username, password, email, phone) {
    this.username = username
    this.password = password
    this.email = email
    this.phone = phone
  }

  var EyeRxAttributes = function(id_user, sphere_right, sphere_left, cylinder_right, cylinder_left, axis_right, axis_left, add_right, add_left, current) {
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

  xit('creates an eyerx record', function () {

    var newTestUser1 = new UserAttributes('Betsy', 'm4d50n', 'betsy@me.com', '123-789-3456'), id_user1 = undefined
    var newEyeRx1 = new EyeRxAttributes(id_user1, 2.25, 2.00, 2.00, -1.25, 20, 48, 2, 2, true)

    return User.createUser(newTestUser1)
      .then( function() {
        return User.findByUsername('Betsy') 
      })
      .then( function(user) {
        id_user1 = user.id_user;
        return EyeRx.create(newEyeRx1); 
      })
      .then( function(result) {
        // console.log('got new eyerx record: ', result);
        expect(result.id_user).to.equal(id_user1)
        expect(result.sphere_right).to.equal(2.25)
        expect(result.sphere_left).to.equal(2.00)
        expect(result.cylinder_right).to.equal(2.00)
        expect(result.cylinder_left).to.equal(-1.25)
        expect(result.axis_right).to.equal(20)
        expect(result.axis_left).to.equal(48)
        expect(result.add_right).to.equal(2)
        expect(result.add_left).to.equal(2)
        expect(result.current).to.equal(true)
      })
  })

  xit('retrieves all eyerx records associated with user', function() {

    var newTestUser2 = new UserAttributes('Ferdie', 'Brigham123654', 'ferdie@brigham.com', '123-789-3456'), id_user2 = undefined
    var newEyeRx2 = new EyeRxAttributes(id_user2, 2.50, 1.75, 2.00, -1.00, 24, 42, 1.50, 1, true)
    var newEyeRx3 = new EyeRxAttributes(id_user2, 2.50, 1.50, 2.00, -.75, 30, 10, .5, 1.5, false)

    return User.createUser(newTestUser2)
      .then( function() {
        return User.findByUsername('Ferdie') 
      })
      .then( function(user) {
        id_user2 = user.id_user;
        return EyeRx.create(newEyeRx2); 
      })
      .then( function() { return EyeRx.create(newEyeRx3) })
      // this may depend on a function extended from .getAll, to return everything associated
        // with a particular user, like the user-doctor model's 'UserDoctor.findAllDoctors'.
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyeRx) {
        // console.log('got all eye rx's: ', allEyeRx)
        expect(allEyeRx).to.have.length(2)
        expect(allEyeRx[0]['id_user']).to.equal(id_user2)
        expect(allEyeRx[0]['sphere_right']).to.equal(2.50)
        expect(allEyeRx[0]['sphere_left']).to.equal(1.50)
        expect(allEyeRx[0]['cylinder_right']).to.equal(2.00)
        expect(allEyeRx[1]['cylinder_left']).to.equal(-.75)
        expect(allEyeRx[1]['axis_right']).to.equal(30)
        expect(allEyeRx[1]['axis_left']).to.equal(10)
        expect(allEyeRx[1]['add_right']).to.equal(.5)
        expect(allEyeRx[1]['add_left']).to.equal(1.5)
        expect(allEyeRx[1]['current']).to.equal(false)
      })
  })

  xit('retrieves an eyerx record by id', function() {

    var eyerx_id4 = undefined

    var newTestUser3 = new UserAttributes('Merritt', 'Thorne123', 'merritt@gmail.com', '123-789-3456'), id_user3 = undefined
    var newEyeRx4 = new EyeRxAttributes(id_user2, 1.00, 1.25, 1.25, 1.00, 20, 20, 1.00, 1.00, true)
    

    return User.createUser(newTestUser3)
      .then( function() {
        return User.findByUsername('Merritt') 
      })
      .then( function(user) {
        id_user3 = user.id_user;
        return EyeRx.create(newEyeRx4); 
      })
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyeRx) {
        eyerx_id4 = allEyeRx[0]['id_eyerx']
      })
      .then( function() { 
        return EyeRx.findById(eyerx_id4);
      })
      .then( function(result) { 
        // console.log('found eyerx record by ID: ', result)
        expect(allEyeRx[0]['id_eyerx']).to.equal(eyerx_id4)
        expect(allEyeRx[0]['sphere_right']).to.equal(1.00)
        expect(allEyeRx[0]['sphere_left']).to.equal(1.25)
        expect(allEyeRx[0]['cylinder_right']).to.equal(1.25)
        expect(allEyeRx[0]['cylinder_left']).to.equal(1.00)
        expect(allEyeRx[0]['axis_right']).to.equal(20)
        expect(allEyeRx[0]['axis_left']).to.equal(20)
        expect(allEyeRx[0]['add_right']).to.equal(1.00)
        expect(allEyeRx[0]['add_left']).to.equal(1.00)
        expect(allEyeRx[0]['current']).to.equal(true)
      })
  })

  xit('deletes an eyerx record by id', function() {

    var eyerx_id5 = undefined

    var newTestUser4 = new UserAttributes('Ralf', 'Garey', 'rgarey@gmail.com', '123-789-3456'), id_user4 = undefined
    var newEyeRx5 = new EyeRxAttributes(id_user2, -1.00, -1.25, -1.25, -1.00, 10, 10, -1.00, -1.00, false)

    return User.createUser(newTestUser4)
      .then( function() {
        return User.findByUsername('Ralf') 
      })
      .then( function(user) {
        id_user4 = user.id_user;
        return EyeRx.create(newEyeRx5); 
      })
      .then( function() { return EyeRx.getAll() })
      .then( function(allEyerx) {
        eyerx_id5 = allEyeRx[0]['id_eyerx']
      })
      .then( function() { 
        return EyeRx.deleteById(eyerx_id5);
      })
      .then( function(deletedRecord) {
        expect(deletedRecord).to.equal(1)

        return EyeRx.findById(eyerx_id5)
      })
      .then(function(deletedRecord) {
        expect(deletedRecord).to.be.an('undefined')
      })
  })  

})
