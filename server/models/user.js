const db = require('../db')
const Model = require('./model-helper')

const User = new Model('users', ['id_user', 'username', 'password', 'email', 'phone'])
module.exports = User
