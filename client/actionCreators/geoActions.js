const stateAction    = require('./stateActions');
const browserHistory = require('react-router').browserHistory;

const GEOMAP_KEY = 'AIzaSyA41W0As4bmHbOuEppxSAvq3zwkJw9_acY';

function GeoCode () {
	// console.log(some)
  // return (dispatch) => {
	  return fetch("https://maps.googleapis.com/maps/api/geocode/json?address=645 Clinic Rd Hannibal, MO 63401&key=" + GEOMAP_KEY)
	    .then((data) => {
	    	return data.json();
	    })
	    .then((coord) => {
	      var coordinates = [];
	      coord.results.forEach((geometry) => {
	      	var lat = geometry.geometry.location.lat;
	      	var lng = geometry.geometry.location.lng;
	      	coordinates.push(lat,lng);
	      console.log("Coordinates: ", coordinates);
	      })
	    })
	    .catch(function (err) {
	      console.log('coordinates api error:', err);
	    })
	// };
};

module.exports = GeoCode;