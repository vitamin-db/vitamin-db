const twilio_accountsid = process.env.TWILIO_ACCOUNTSID || TWILIO_ACCOUNTSID;
const twilio_authtoken = process.env.TWILIO_AUTHTOKEN || TWILIO_AUTHTOKEN;
const twilio_twilionumber = process.env.TWILIO_TWILIONUMBER || TWILIO_TWILIONUMBER;

const client = require('twilio')(twilio_accountsid, twilio_authtoken);
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
      client.sendMessage( { to: numbers[i], from: twilio_twilionumber, body:'You have an upcoming Appointment!'}, function( err, data ) {
        console.log( data.body );
      });
    }
  },  null, true));
};

module.exports = Reminder(arr);
