const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);
const cronJob = require('cron').CronJob;
const later = require('later');

var numbers = [];
var d = new Date('03/21/2016 21:36Z');

var minute = later.minute.val(d);
var hour = later.hour.val(d);
var day = later.day.val(d);
var month = later.month.val(d);
var year = later.year.val(d);

var arr = [];
var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' * *';

arr.push(parsedCron);
arr.push('00 37 21 21 * *')
console.log(arr)



var Reminder = (arr) => {
  arr.map((val) => 
  new cronJob(val, function(){
    for( var i = 0; i < numbers.length; i++ ) {
      client.sendMessage( { to: numbers[i], from: config.twilioNumber, body:'You have an upcoming Appointment!'}, function( err, data ) {
        console.log( data.body );
      });
    }
  },  null, true));
};

module.exports = Reminder(arr);