$ = jQuery = require('jquery');

const Request = {
  SignIn: (body) => {
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
};

module.exports = Request;