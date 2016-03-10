$ = jQuery = require('jquery');
// This file is for all client api requests
// this request below is just a test request for now
function SignIn (body) {
	return $.ajax({
	  url: 'http://httpbin.org/post',
	  method: 'POST',
	  data: JSON.stringify(body),
	  dataType: 'json',
	  contentType: 'application/json',
	  success: (data) => {
	  	const purse = JSON.parse(data.data);
	  	console.log(purse);
	  },
	  error: (err) => {
	  	console.error(err)
	  }
	});
}

function SignUp (body) {
  return $.ajax({
    url: 'http://httpbin.org/post',
    method: 'POST',
    data: JSON.stringify(body),
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      const purse = JSON.parse(data.data);
      return purse;
    },
    error: (err) => {
      console.error(err)
    }
  });
}

module.exports = {
  SignIn,
  SignUp
};