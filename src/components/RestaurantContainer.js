import React, { Component } from 'react';
import RestaurantList from './RestaurantList';


import {checkStatus, parseJSON} from '../utilities/index';
import GeoLocation from './GeoLocation';
//import UserInput from './UserInput';

class RestaurantContainer extends Component {
	constructor(props) {
    super(props);
    this.state = {
			restaurants : [],
			sort: 'ratings',
			query: this.props.query,
			zipcode: 94080
    };
		this.toggleSortRatings = this.toggleSortRatings.bind(this);
		this.toggleSortDistance = this.toggleSortDistance.bind(this);
	//	this.updateQuery = this.updateQuery.bind(this);
		this.onLocationChange = this.onLocationChange.bind(this);
		this.fetchRestaurants = this.fetchRestaurants.bind(this);
  }
	fetchRestaurants (query, latitude, longitude) {
	   let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCU6bsx-PLT5fW02T5GeiwA8cOOY7l2rU4`;
	   fetch(url)
			.then(checkStatus)
			.then(parseJSON)
			.then(function(data) {
				if(data && data['results']){					
					this.setState({
						restaurants :  data['results']
					});
				}
			
			}.bind(this)).catch(function(error) {
				console.log('request failed', error)
			})
	}
	componentDidMount() {
		this.fetchRestaurants(this.state.query, this.state.latitude, this.state.longitude );
	}
	onLocationChange(latitude, longitude){
		this.setState({latitude, longitude});
		this.fetchRestaurants(this.state.query, latitude, longitude);
	}
	toggleSortDistance(e) {
		e.preventDefault();
		let results = this.state.restaurants
		results = this.state.restaurants.sort((a, b) => {
			if(!isFinite(a.Distance-b.Distance))
				 return !isFinite(a.Distance) ? 1 : -1;
			else
				 return a.Distance - b.Distance;
		});
		this.setState({
			sort :'distance',
			restaurants :  results
		});
	}
	toggleSortRatings(e) {
		e.preventDefault();
		let results = this.state.restaurants
		results = this.state.restaurants.sort((a, b) => {
			if(!isFinite(a.Rating.AverageRating-b.Rating.AverageRating))
				 return !isFinite(a.Rating.AverageRating) ? 1 : -1;
			else
				 return b.Rating.AverageRating - a.Rating.AverageRating;
		});
		this.setState({
			sort :'ratings',
			restaurants :  results
		});
	}
	render() {
		const { restaurants, latitude, longitude } = this.state;
		const Tmpl = () => (<div className="col-sm-8 col-xs-12">
								<h3>Suggested restaurants:</h3>					
								<RestaurantList restaurants={restaurants} latitude={latitude} longitude={longitude}/>
							</div>);
    return (
			<div className="row">
				<div className="col-sm-4 col-xs-12">					
					<GeoLocation onLocationChange={this.onLocationChange} />
					{restaurants && <Tmpl/> }
				</div>
				
			</div>
    )
  }
}
export default RestaurantContainer;
