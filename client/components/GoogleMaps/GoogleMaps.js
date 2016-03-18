const React = require('react');
const GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
const GoogleMap = require('react-google-maps').GoogleMap;
const Marker = require('react-google-maps').Marker;

const JoogleMaps = () => {
  return (
  	<div className="map">
      <GoogleMapLoader
        containerElement={<div style={{height: "100%"}} />}
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{lat: 30.268884, lng: -97.740520}}>
          </GoogleMap>
        }
      />
    </div>
  );
};

module.exports = JoogleMaps;