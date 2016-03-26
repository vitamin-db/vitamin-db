const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);
const Appointment = require('../models/appointment');
// For production:
  // If you want to test locally, comment out the line below, and uncomment lines 1-2.
// const client = require('twilio')();
const cronJob = require('cron').CronJob;
const later = require('later');
const Promise = require('bluebird');


Reminder = function() {
  return Appointment.getAllForTwilio()
	.then((data) => {
		// console.log('data in TEXTSMS', data)
		return data
	})
	.then((apptList) => {
		var result = {}
		return apptList.map((val) => {
			var d = new Date(val.date + ' ' + val.time+'Z')
			var minute = later.minute.val(d);
			var hour = later.hour.val(d);
			//setting to day prior so user can get
			//notification 24hr in advance
			var day = later.day.val(d) - 1;
			var month = later.month.val(d);
			// console.log('cron', minute, hour, day, month)
			// cronJob not working with month
			var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' * *';			result['cron'] = parsedCron;
			result['userPhone'] = '+1'+val.userPhone;
			result['docName'] = val.docName;
		    result['docAddress'] = val.docAddress;
			return result
		})
	})
	.then((final) => {
		console.log('final data', final)
		return final.map((item) => {
			// cronJob is used to schedule event from date & time
			// format: '* * * * * *' are filled in by 
			// 'sec min hr day month dayOfWeek(1-6)'
	  		new cronJob(item.cron, function(){
	      	    client.sendMessage( { to: item.userPhone, from: config.twilioNumber, body:'You have an upcoming Appointment with ' + item.docName + ', at' + item.docAddress + '!'}, function( err, data ) {
	      			console.log('err', err)
	      			console.log( data.body );
	      		});
	    }, null, true)
	  });
	})
	.catch(function (err) {
       console.error('Twilio Error:', err);
    });

};

module.exports = Reminder;


