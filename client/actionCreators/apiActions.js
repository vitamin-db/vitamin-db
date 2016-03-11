// $ = jQuery = require('jquery');
// const fetch = require('whatwg-fetch');

// This file is for all client api requests
// this request below is just a test request for now
const Request = {
//   SignIn: (body) => {
//   	return $.ajax({
//   	  url: '/authenticate/login',
//   	  method: 'POST',
//   	  data: JSON.stringify(body),
//   	  dataType: 'json',
//   	  contentType: 'application/json',
//   	  success: (data) => {
//   	  	const purse = JSON.parse(data.data);
//   	  	console.log(purse);
//   	  },
//   	  error: (err) => {
//   	  	console.error(err)
//   	  }
//   	});
//   }
// };

  SignIn: (body) => {

    // url (required), options (optional)
    fetch('/authenticate/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(function(response) {
      // console.log('response.data: ', response.data);
      // const purse = JSON.parse(response.data);
      // console.log('purse: ', purse);
      return response.json();
    })
    .then(function(j) {
      // Yay, `j` is a JavaScript object
      console.log('j: ', j);
      // localStorage.setItem("token", )
      window.localStorage.setItem("token", j['token']);
      // console.log('window: ', window, 'Window: ', Window);
    })
    .catch(function(err) {
      console.error(err)
    });
  } // End SignIn(body)
} // End Request


module.exports = Request;