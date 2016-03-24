// const config = require('../../server/config');
// const client = require('twilio')(config.accountSid, config.authToken);

// For production:
  // If you want to test locally, comment out the line below, and uncomment lines 1-2.
const client = require('twilio')();
const cronJob = require('cron').CronJob;
const later = require('later');

var numbers = ['+15127364286'];
var d = new Date('03/21/2016 21:56Z');

var minute = later.minute.val(d);
var hour = later.hour.val(d);
var day = later.day.val(d);
var month = later.month.val(d);
var year = later.year.val(d);

var arr = [];
var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' * *';

arr.push(parsedCron);
arr.push('00 37 1 24 * *')
console.log(arr)



var Reminder = (array) => {
  array.map((val) => 
  new cronJob(val, function(){
    for( var i = 0; i < numbers.length; i++ ) {
      client.sendMessage( { to: numbers[i], from: TWILIO_TWILIO_NUMBER, body:'You have an upcoming Appointment!'}, function( err, data ) {
        console.log( data.body );
      });
    }
  },  null, true));
};

module.exports = Reminder(arr);
