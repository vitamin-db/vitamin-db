var express = require('express')
const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);
const cronJob = require('cron').CronJob;
const later = require('later');

var numbers = ['+15127364286'];
var d = new Date('03/21/2016 20:37Z');
var t = new Date('12:30')
// var getDate = later.parse.cron('03/21/2016')
var day = later.day.val(d);
// var cro = later.parse.text(d)
var month = later.month.val(d);
var year = later.year.val(d);
var hour = later.hour.val(d);
var minute = later.minute.val(d);

var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' * *';
console.log(parsedCron)

var Job = new cronJob(parsedCron, function(){
  for( var i = 0; i < numbers.length; i++ ) {
    client.sendMessage( { to: numbers[i], from: config.twilioNumber, body:'Hello! Hope you’re having a good day.'}, function( err, data ) {
      console.log( data.body );
    });
  }
},  null, true);

module.exports = Job;