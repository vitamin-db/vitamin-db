const React = require('react');
const GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
const GoogleMap = require('react-google-maps').GoogleMap;
const Marker = require('react-google-maps').Marker;
// const GeoCode = require('../../actionCreators/geoActions');

const JoogleMaps = (coord) => {
  console.log(coord.lat, coord.lon)
  const state = {
    markers: [{
      position: {
        lat: coord.lat,
        lng: coord.lon,
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
            defaultCenter={{lat: coord.lat, lng: coord.lon}}
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