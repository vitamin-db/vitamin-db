const React = require('react');
const GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
const GoogleMap = require('react-google-maps').GoogleMap;
const Marker = require('react-google-maps').Marker;

const JoogleMaps = (props) => {
  console.log(props.lat, props.lon)
  const state = {
    markers: [{
      position: {
        lat: props.lat,
        lng: props.lon,
      },
      defaultAnimation: 2,
    }],
  }
  return (
      <GoogleMapLoader
        containerElement={<div style={{height: "100%"}} />}
        googleMapElement={
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{lat: props.lat, lng: props.lon}}
          >
          {state.markers.map((marker) => {
            console.log("GOOGLE MARKER:", marker)
              return (
                <Marker
                  key={marker.position.lat}
                  {...marker}
            />
            );
          })};
          </GoogleMap>
        }
      />
  );
};

module.exports = JoogleMaps;