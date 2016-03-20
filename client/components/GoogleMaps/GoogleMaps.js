const React = require('react');
const GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
const GoogleMap = require('react-google-maps').GoogleMap;
const Marker = require('react-google-maps').Marker;

const JoogleMaps = (props) => {
  console.log(props.lat, props.lon)
  return (
      <GoogleMapLoader
        containerElement={<div style={{height: "100%"}} />}
        googleMapElement={
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{lat: props.lat, lng: props.lon}}>
          </GoogleMap>
        }
      />
  );
};

module.exports = JoogleMaps;