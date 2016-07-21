import React, { Component } from 'react';

var currentPosition;
export default class SearchForm extends Component {

  constructor(props) {
    super(props);
    var currentPosition;
    this.state = {
      showWarning: false
    }
  }

  componentDidMount() {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(28.70, -127.50), 
      new google.maps.LatLng(48.85, -55.90)
      );
      var locationInput = document.getElementById('searchTextField');
      var dateInput = document.getElementById('searchDateField');
      var radiusInput = document.getElementById('radiusInputField')

      var searchBox = new google.maps.places.SearchBox(locationInput, {
        bounds: defaultBounds
      });

      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        var address = places[0].formatted_address;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address' : address }, function( results, status ) {
          if( status == google.maps.GeocoderStatus.OK ) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              this.props.setAddress(address);
              this.props.handleNewParams({ lat: latitude, lng: longitude }, this.props.date);
          }
          if (this.props.changeCenterOfMap) { //if we want to change the center of the map
            console.log("now change the center");
            this.props.handleNewParams({ lat: latitude, lng: longitude }, this.props.date, true);
          }
        }.bind(this));
      }.bind(this));

      dateInput.addEventListener('change', function() {
        this.props.handleNewParams(this.props.location, dateInput.value);
      }.bind(this));
      if (!this.props.showButton){
        radiusInput.addEventListener('input', function() {
          this.props.handleChangeInRadius(radiusInput.value);
        }.bind(this));
      }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.address || ((newProps.location && this.props.location) && newProps.location != this.props.location)) {
      this.displayAddress(newProps.location);
    }
  }

  displayAddress(location) {  
    console.log("trying to show address");
    var locationInput = document.getElementById('searchTextField');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { latLng: location }, function( results, status ) {
      if ( status == google.maps.GeocoderStatus.OK ) {
        var address = results[0].formatted_address;
        locationInput.value = address;
        this.props.setAddress(address);
      }
    }.bind(this));
  }

  handleGetStartedPress() {
    if (this.props.location && this.props.date) {
      this.props.switchPage();
    } else {
      this.setState({showWarning: true})
    }
  }

  render() {
    return (
      <section className="search-form">
        <input 
          className="input input-location" 
          id="searchTextField" 
          type="text"
          defaultValue={this.props.address}
          placeholder="Enter your city or address"
         />
        <input 
          className="input input-date"
          id="searchDateField"
          type="date" 
          defaultValue={this.props.date} 
        />

      { (this.props.showButton) && 
        <button className="button get-started" onClick={() => this.handleGetStartedPress() }> Get Started </button>
      }
        <div>
        <button className="button is-small" onClick={() => this.props.handleGeolocationPress()}> Use My Current Location </button>
        </div>
        { (!this.props.showButton) && <div className="range-finder"> Range <input className="center" id="radiusInputField" defaultValue={2} type="range" min=".2" max="30" step=".2" /> </div> }

        { (this.state.showWarning) && <p className='warning'> Location And Date Need To Be Filled In </p> }
      </section>

    );
  }

}