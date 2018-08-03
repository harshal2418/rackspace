import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import { Redirect } from 'react-router';

class GeoMapDirection extends Component { 
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      currentlat: '',
      currentlng: ''
		};
  }
  componentWillMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currentlat: position.coords.latitude,
          currentlng: position.coords.longitude
        });   
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  componentDidCatch(error, info) {    
    this.setState({redirect: true});
  }
  render() {
    const {slat, slng, dlat, dlng} = JSON.parse(localStorage.getItem('data'));
    if (this.state.redirect) {
			return <Redirect push to={{
                pathname: '/'
            }}/>;
		  }
  const MapWithADirectionsRenderer = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyCU6bsx-PLT5fW02T5GeiwA8cOOY7l2rU4&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `50%` }} />,
      containerElement: <div style={{ height: `500px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
      componentDidMount() {             
        
        const DirectionsService = new window.google.maps.DirectionsService();
          DirectionsService.route({
          origin: new window.google.maps.LatLng(slat, slng),
          destination: new window.google.maps.LatLng(dlat, dlng),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }
    })
  )(props =>    
   
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new window.google.maps.LatLng(slat, slng)}    >    
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );

    return (
      <div className="GeoMapDirection">
        <MapWithADirectionsRenderer />
      
      </div>
    );
  }
}

export default GeoMapDirection;
