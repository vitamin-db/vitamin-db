const db = require(__server + '/db')
const request = require('supertest-as-promised')
const routes = require(__server + '/index')
const Auth = require(__server + '/models/auth')
const User = require(__server + '/models/user')
const Doctor = require(__server + '/models/doctor')
const UserDoctor = require(__server + '/models/user-doctor')
const TH = require(__test + '/test-helper')


xdescribe("POST /authenticate", function() {

  //set up app
  var app = TH.createApp()
  app.use('/', routes)
  app.testReady()

  beforeEach(function() {
    return db.deleteEverything()
  })

  var UserAttributes = function(username, password, email, phone) {
    this.username = username
    this.password = password
    this.email = email
    this.phone = phone
  }

  var DoctorAttributes = function(name, street_address, city, state_abbrev, zip, email, web, phone, type) {
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

  var UserDoctorAttributes = function(id_user, id_doctor, type_usermade) {
    this.id_user = id_user;
    this.id_doctor = id_doctor;
    this.type_usermade = type_usermade;
  }

  // /////////////////////////////////
  // TEST /LOGIN
  // /////////////////////////////////

  it("returns a token on successful login", function() {

    var newTestUser = new UserAttributes('miriam', 'foo', 'mir@foo.com', '123-789-3456')

    return User.createUser(newTestUser)
      .then( function(user) {
        return request(app)
          .post('/authenticate/login')
          .send({ username: newTestUser.username, password: newTestUser.password })
          .expect(200)
        .then( function(result) {

          var loginRes = JSON.parse(result.text)
          console.log('loginRes: ', loginRes);

          expect(loginRes).to.be.an('object')
          expect(loginRes).to.have.key('token')         
          expect(loginRes['token']).to.be.a('string')
          
        })
      })
  })

  it("returns 400 an an error message if supplied unknown username", function() {
    var newTestUser2 = new UserAttributes('Leo', 'McGarry', 'chief@wh.com', '123-789-3456')

    return User.createUser(newTestUser2)
      .then( function(user) {
        return request(app)
          .post('/authenticate/login')
          .send({ username: 'JoshLyman', password: 'sup' })
          .expect(400)
        .then( function(result) {

          var loginRes = JSON.parse(result.text)

          expect(loginRes).to.be.an('object')
          expect(loginRes).to.have.keys('error', 'msg')
          expect(loginRes.msg).to.equal('No account associated with that username')
        })
      })
  })

  it("returns 400 and an error message if supplied existing user, incorrect password", function() {

    var newTestUser3 = new UserAttributes('Josh', 'Lyman', 'lemonlyman@fool.com', '123-789-3456')
    var newTestUser4 = new UserAttributes('CJ', 'Cregg', 'chief@badass.com', '123-789-3456')

    return User.createUser(newTestUser3)
      .then( function(user) {
        return User.createUser(newTestUser4)
      })
      .then( function(user) {
        return request(app)
          .post('/authenticate/login')
          .send({ username: 'Josh', password: 'Cregg' })
          .expect(400) 
        .then( function(result) {

          var loginRes = JSON.parse(result.text)

          expect(loginRes).to.be.an('object')
          expect(loginRes).to.have.keys('error', 'msg')
          expect(loginRes['msg']).to.equal('Invalid username and password combination')
        })
      })
    
  })

  it("returns 400 and an error message if user forgot to enter username", function() {
    return request(app)
      .post('/authenticate/login')
      .send({ username: "", password: 'Cregg' })
      .expect(400)
      .then( function(result) {

        var loginRes = JSON.parse(result.text)

        expect(loginRes).to.be.an('object')
        expect(loginRes).to.have.key('msg')
        expect(loginRes['msg']).to.equal('Please enter a username')
      })
  })

  it("returns 400 and an error message if user forgot to enter password", function() {
    return request(app)
      .post('/authenticate/login')
      .send({ username: "Josh", password: '' })
      .expect(400)
      .then( function(result) {

        var loginRes = JSON.parse(result.text)

        expect(loginRes).to.be.an('object')
        expect(loginRes).to.have.key('msg')
        expect(loginRes['msg']).to.equal('Please enter a password')
      })
  })

  // /////////////////////////////////
  // TEST /SIGNUP
  // /////////////////////////////////

  it("returns a token on successful signup", function() {
    return request(app)
      .post('/authenticate/signup')
      .send({ username: 'Josiah', password: 'Bartlet', email: 'prez@wh.com', phone: '934-345-2948'})
      .expect(201)
    .then( function(result) {

      var loginRes = JSON.parse(result.text)
      console.log('loginRes: ', loginRes);

      expect(loginRes).to.be.an('object')
      expect(loginRes).to.have.key('token')         
      expect(loginRes['token']).to.be.a('string')
      
    })
  })

  it("returns 400 and a username taken msg on attempted signup with existing usename", function() {

    var newTestUser5 = new UserAttributes('Toby', 'Ziegler', 'leak@wh.com', '934-345-2948')

    return User.createUser(newTestUser5)
      .then( function(user) {
        return request(app)
          .post('/authenticate/signup')
          .send({ username: 'Toby', password: 'Ziegler', email: 'leak@wh.com', phone: '934-345-2948' })
          .expect(400) 
        .then( function(result) {
          var loginRes = JSON.parse(result.text)
          expect(loginRes).to.be.an('object')
          expect(loginRes).to.have.keys('error', 'msg')
          expect(loginRes['msg']).to.equal('Username Toby is taken')
        })
      })
  })

  it("returns 400 and an error message if given incomplete information", function() {
    var newTestUser6 = {username: 'Namebly', password: undefined, email: 'nope', phone: '342-492-9229'}

    return request(app)
      .post('/authenticate/signup')
      .send(newTestUser6)
      .expect(400)
      .then(function(result) {
        var loginRes = JSON.parse(result.text)
        expect(loginRes).to.be.an('object')
        expect(loginRes).to.have.key('msg')
        expect(loginRes['msg']).to.equal('Please complete all fields')
      })
  })

  it("returns 400 and an error message if the email provided is not valid", function() {
    //for our purposes, a "valid email address is one with @ and with a .something after the at"
    var newTestUser6 = {username: 'Namebly', password: 'ppaaaaasswrdd', email: 'nope@gmail', phone: 342-492-9229}

    return request(app)
      .post('/authenticate/signup')
      .send(newTestUser6)
      .expect(400)
      .then(function(result) {
        var loginRes = JSON.parse(result.text)
        expect(loginRes).to.be.an('object')
        expect(loginRes).to.have.key('msg')
        expect(loginRes['msg']).to.equal('Please enter a valid email address')
      })
  })

  // /////////////////////////////////
  // TEST LOGOUT
  // /////////////////////////////////

  xit("logged-in user successfully logs out", function() {
    
  })

})