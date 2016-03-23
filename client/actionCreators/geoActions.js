const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

const GEOMAP_KEY = 'AIzaSyA41W0As4bmHbOuEppxSAvq3zwkJw9_acY';

function GeoCode (physAddress) {
	console.log("GeoCodeAddress: ", physAddress)
  // return (dispatch) => {
	  return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + physAddress + "&key=" + GEOMAP_KEY)
	    .then((data) => {
	    	return data.json();
	    })
	    .then((coord) => {
	      var coordinates = [];
	      coord.results.forEach((data) => {
            var lat = data.geometry.location.lat;
            var lng = data.geometry.location.lng;
	      	coordinates.push(lat,lng);
	      console.log("Coordinates: ", coordinates);
	      })
	      return coordinates;
	    })
	    .catch(function (err) {
	      console.log('coordinates api error:', err);
	    })
	// };
};

module.exports = GeoCode;