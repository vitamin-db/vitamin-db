// handles routes that start with /insurance

const Insurance = require('../models/insurance')
const User = require('../models/user')
const SendR = require('../sendresponse')

const InsuranceAPI = require('express').Router();

module.exports = InsuranceAPI