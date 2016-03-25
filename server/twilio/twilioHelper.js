const Appointment = require('../models/appointment');
const Promise = require('bluebird');
const later = require('later');

const setTwilio = function() {
  return Appointment.getAllForTwilio()
	.then((data) => {
		console.log('data in TEXTSMS', data)
		return data
	})
	.then((apptList) => {
		var result = {}
		return apptList.map((val) => {
			var d = new Date(val.date + ' ' + val.time)
			var minute = later.minute.val(d);
			var hour = later.hour.val(d);
			var day = later.day.val(d);
			console.log('cron', minute, hour, day)
			var parsedCron = '00 ' + minute + ' ' + hour + ' ' + day + ' * *';

			result['cron'] = parsedCron;
			result['userPhone'] = val.userPhone;
			result['docName'] = val.docName;
		    result['docAddress'] = val.docAddress;
		    console.log('new obj', result)
			return result
		})
	})
	.catch(function (err) {
       console.error('Twilio Error:', err);
    });

};

module.exports = setTwilio;
