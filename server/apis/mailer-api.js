const MailAPI = require('express').Router();
const nodemailer = require('nodemailer');


module.exports = MailAPI

// MailAPI.post('/', notifyByEmail); // handle the route at /notifyByEmail

// function notifyByEmail(req, res) {
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'vitamindb.thesis@gmail.com', // Your email id
//             pass: 'm4k3r5qu4r3!' // Your password
//         }
//     });
// }

// var mailOptions = {
//     from: 'example@gmail.com>', // sender address
//     to: 'receiver@destination.com', // list of receivers
//     subject: 'Email Example', // Subject line
//     text: text //, // plaintext body
//     // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         console.log(error);
//         res.json({yo: 'error'});
//     }else{
//         console.log('Message sent: ' + info.response);
//         res.json({yo: info.response});
//     };
// });

MailAPI.post('/', function(req, res) {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vitamindb.thesis@gmail.com', // Your email id
        pass: 'm4k3r5qu4r3!' // Your password
    }
  });

  var userEmail = undefined;

  var mailOptions = {
    from: 'vitamindb.thesis@gmail.com', // sender address
    to: 'amberleyjohanna@gmail.com', // list of receivers
    subject: 'ima email subject line', // Subject line
    text: 'Hello world!'
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };


    return transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.json({yo: 'error'});
      } else{
          console.log('Message sent: ' + info.response);
          res.json({yo: info.response});
      };
    });

  // return User.findByUsername( req.decoded.username )
  //   .then(function(user) {
  //     return Insurance.getAllByUser(user.id_user) // takes id_user
  //   })
  //   .then(function(insurance) { // returned array of insurance objects
  //     // console.log('insurance: ', insurance);
  //     SendR.resData(res, 200, insurance)
  //   })
  //   .catch( function(err) {
  //     SendR.error(res, 500, 'Server error getting insurance records', err)
  //   })
})
