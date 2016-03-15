const db = require('../db')
const Model = require('./model-helper')

const EyeRx = new Model('eyerx', ['id_eyerx', 'id_user', 'sphere_right', 'sphere_left', 'cylinder_right', 
	                              'cylinder_left', 'axis_right', 'axis_left', 'add_right', 'add_left', 'current'])
module.exports = EyeRx

