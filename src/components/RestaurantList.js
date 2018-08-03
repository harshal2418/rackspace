import React, { Component } from 'react';
import 'whatwg-fetch';
import { Redirect } from 'react-router';
class RestaurantList extends Component {
	constructor(props){
		super(props);		
		this.state = {
			redirect: false
		};
	}

	handleOnClick(e,restaurant) {
		this.setState({redirect: true, latlng: restaurant.geometry.location});
		localStorage.setItem('data',JSON.stringify({ slat:this.props.latitude, slng: this.props.longitude, dlat: restaurant.geometry.location.lat, dlng: restaurant.geometry.location.lng}));
	}
	
	render() {
		let restaurantStatus;
		var restaurants = this.props.restaurants;
		const longitude = this.props.longitude;
		const latitude = this.props.latitude;
		const getDistance = (location) => {
			const radlat1 = Math.PI * location.lat/180
			const radlat2 = Math.PI * latitude/180
			const theta = location.lng-longitude;
			const radtheta = Math.PI * theta/180
			let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515
			dist = dist * 1.609344;		
			return dist.toFixed(2)+'KM';
		}
		if (this.state.redirect) {
			return <Redirect push to={{
                pathname: '/Direction',
                data: { slat:this.props.latitude, slng: this.props.longitude, dlat: this.state.latlng.lat, dlng: this.state.latlng.lng}
            }}/>;
		  }
		return (
			<div>
				<ul className="list-group">
					{restaurants.map((restaurant) => {
						if(restaurant.opening_hours){
						restaurantStatus = restaurant.opening_hours.open_now ? 'Open' : 'Close';
					}
						return (
							<li key={restaurant.id} className="list-group-item">
								<div className="leftSection">
								<a href={restaurant.Url} >
									<h4 className="list-group-item-heading">{restaurant.name}</h4>
								</a>
								<p className="list-group-item-text">
								{restaurant.vicinity}
								</p>
									Distance: {getDistance(restaurant.geometry.location)} <br/>
									Ratings: {restaurant.rating !== 'NaN' ? restaurant.rating : '0'}<br/>
                                    Status: {restaurantStatus}
									<img className="direction" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6RuIC2BF0pOdPcpwMjBO-YfqLjHIEM0HlCQNRKVYJk48ZAdzH"
									 onClick={e => { this.handleOnClick(e,restaurant)}} />
									
							</div>
							<div className="rightSection">
							<div className="imageRest"><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyCU6bsx-PLT5fW02T5GeiwA8cOOY7l2rU4`} />
							</div>
							</div>
							</li>
						)

					})}
				</ul>				
			</div>
		)
	}
}
export default RestaurantList;
