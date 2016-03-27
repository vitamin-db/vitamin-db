const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

// For production:
  // If you want to test locally, comment out the line below, and uncomment lines 1-2.
// const client = require('twilio')();

const Appointment = require('../models/appointment');
const CronJob = require('cron').CronJob;
const later = require('later');
const Promise = require('bluebird');

Reminder = function() {
	return Appointment.getAllForTwilio()
		.then((dataSMS) => {
		return dataSMS.map(function(item) {
			var cron = item.cron;
	  		new CronJob(cron, function(){
	      	    client.sendMessage( { to: item.userPhone, from: config.twilioNumber, body:'You have an upcoming Appointment with ' + item.docName + ', at ' + item.time + ' ' + item.date + '!'}, function( err, data ) {
	      			console.log('err', err)
	      			console.log( data.body );
	      		});
	      	console.info('cron job completed');
	    }, null, true);
	  });
	})
};


module.exports = Reminder();


