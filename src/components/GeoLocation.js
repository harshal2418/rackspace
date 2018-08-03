import React, { Component } from 'react';
import 'whatwg-fetch';
import {checkStatus, parseJSON} from '../utilities/index';
import PlacesAutocomplete from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';
//AIzaSyCU6bsx-PLT5fW02T5GeiwA8cOOY7l2rU4
class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude : '',
      longitude : '',
      zipcode : '',
      message : "Fetching your location .."
    };
    this.updatePosition = this.updatePosition.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleQuerysubmit = this.handleQuerysubmit.bind(this);    
  }
  getLocation() {
    
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.updatePosition);
      } else {
        this.setState({
          message : 'Geolocation is not supported by this browser. App default location used.',
        })
      }
  }
  updatePosition(position) {
    // this.getZipcode(position.coords.latitude, position.coords.longitude);
    var message = "";
    message = "Your location is:";
    this.setState({
      message : message,
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  }
  handleQuerysubmit(e) {
    e.preventDefault();
    this.props.onLocationChange(this.state.latitude, this.state.longitude);
	}
 
  componentDidMount() {
    this.getLocation();   
  }
  

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">         
          Enter Your Place
        </div>
        <div className="panel-body">
         <form onSubmit={this.handleQuerysubmit}>
            <div className="form-group searchwrapper">
              <Autocomplete
                  style={{width: '90%'}}
                  onPlaceSelected={(place) => {
                    this.setState({
                      latitude : place.geometry.location.lat(),
                      longitude : place.geometry.location.lng()
                    });
                  }}
                  types={['(regions)']}                  
              />       
            </div>

            <button type="submit" className="btnSubmit" >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default GeoLocation;
