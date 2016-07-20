import React, { Component } from 'react';

export default class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: null,
      date: this.props.today,
      showWarning: false
    }
  }

  componentDidMount() {
    var that = this;
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(28.70, -127.50), 
      new google.maps.LatLng(48.85, -55.90)
      );
      var cityInput = document.getElementById('searchTextField');
      var dateInput = document.getElementById('searchDateField');
      var radiusInput = document.getElementById('radiusInputField')

      var searchBox = new google.maps.places.SearchBox(cityInput, {
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
              that.setState({location: `${latitude}, ${longitude}`})
              that.props.makeCall(that.state.location, that.state.date);
          } else {
              alert( 'Geocode was not successful because: ' + status );
          }
        });

      });

      dateInput.addEventListener('change', function() {
        //var dayInEventfulApiForm = dateInput.value.replace(/-/g, "") + "00";
        that.setState({date: dayInEventfulApiForm + "-" + dayInEventfulApiForm})
        that.props.makeCall(that.state.location, that.state.date);
      });
      if (!that.props.showButton){
        radiusInput.addEventListener('input', function() {
          that.props.handleChangeInRadius(radiusInput.value);
        })
      }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.currentPosition) { //not sure about this fix..
      console.log("search form receiving props");
      var cityInput = document.getElementById('searchTextField');
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'latLng': newProps.currentPosition }, function( results, status ) {
        if( status == google.maps.GeocoderStatus.OK ) {
            cityInput.value = results[0].formatted_address;
            this.setState({location: `${newProps.currentPosition.lat}, ${newProps.currentPosition.lng}`});
            this.props.makeCall(this.state.location, this.state.date);
        } 
        // else {
        //     console.log( 'Geocode was not successful because: ' + status );
        // }
      }.bind(this));
    }

  }

  // isTheCityAndDateFilledIn(place, date) {
  //   if (place && date) {
  //     this.setState({cityAndDateFilledIn: true});
  //   } else {
  //     this.setState({cityAndDateFilledIn: false});
  //   }
  // }

  handleGetStartedPress() {
    if (this.state.location && this.state.date) {
      this.props.switchPage();
    } else {
      this.setState({showWarning: true})
    }
  }

  render() {
    return (
      <section className="search-form">
        <input 
          className="input input-city" 
          id="searchTextField" 
          placeholder="Enter your city/address" 
          type="text" 
         />
        <input 
          className="input input-date"
          id="searchDateField"
          type="date" 
          defaultValue={this.props.today} 
        />

        { (this.props.showButton) && <button className="button get-started" onClick={() => this.handleGetStartedPress() }> Get Started </button> }
        { (!this.props.showButton) && <div className="range-finder"> Range <input className="center" id="radiusInputField" defaultValue={2} type="range" min=".2" max="10" step=".2" /> </div> }
        { (this.state.showWarning) && <p className='warning'> The City And Date Need To Be Filled In </p> }
      </section>
    );
  }

}