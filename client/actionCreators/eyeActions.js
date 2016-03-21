const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

// function AddEyeRx (eyeRx) {
//   return (dispatch) => {
//     return fetch('TEMPORARY_FILLER', {
//       method: 'put',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': getCookie("token")
//       },
//       body: eyeRx
//     })
//     .then((response) => {
//       console.log("add eye res", response);
//     })
//     .catch((err) => {
//       console.error("add eye err", err);
//     })
//   };
// };

// function ChangeEyeRx (newEye) {
//   return (dispatch) => {
//     return fetch('TEMPORARY_FILLER', {
//       method: 'put',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-access-token': getCookie("token")
//       },
//       body: newEye
//     })
//     .then((response) => {
//       console.log("change eye res", response);
//     })
//     .catch((err) => {
//       console.error("change eye err", err);
//     })
//   };
// };