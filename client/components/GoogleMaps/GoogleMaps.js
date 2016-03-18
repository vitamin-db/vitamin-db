const React = require('react');
const GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
const GoogleMap = require('react-google-maps').GoogleMap;
const Marker = require('react-google-maps').Marker;

const JoogleMaps = (props, {state}) => {
	console.log("what is props!!!",{props});
	console.log("what is this.state", state);
  return (
  	<div>
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{lat: 30.268884, lng: -97.740520}}
           
            })}
          </GoogleMap>
        }
      />
    </section>
    </div>
  );
}

module.exports = JoogleMaps;