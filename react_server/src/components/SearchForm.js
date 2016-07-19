import React, { Component } from 'react';

export default class SearchForm extends Component {

  constructor(props) {
    super();
    this.state = {
      location: null,
      date: null
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
              that.props.isTheCityAndDateFilledIn(that.state.location, that.state.date);
          } else {
              alert( 'Geocode was not successful because: ' + status );
          }
        });

      });

      dateInput.addEventListener('change', function() {
        var dayInEventfulApiForm = dateInput.value.replace(/-/g, "") + "00";
        that.setState({date: dayInEventfulApiForm + "-" + dayInEventfulApiForm})
        that.props.isTheCityAndDateFilledIn(that.state.location, that.state.date);
        that.props.makeCall(that.state.location, that.state.date);
      });
      if (!that.props.showButton){
        radiusInput.addEventListener('input', function() {
          that.props.handleChangeInRadius(radiusInput.value);
        })
      }
  }
  componentWillReceiveProps(newProps) {
    var cityInput = document.getElementById('searchTextField');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'latLng': newProps.currentPosition }, function( results, status ) {
      if( status == google.maps.GeocoderStatus.OK ) {
          cityInput.value = results[0].formatted_address;
          this.setState({location: `${newProps.currentPosition.lat}, ${newProps.currentPosition.lng}`});
          this.props.isTheCityAndDateFilledIn(this.state.location, this.state.date);
      } 
      // else {
      //     console.log( 'Geocode was not successful because: ' + status );
      // }
    }.bind(this));

  }




  render() {
    // var inputStyle = {
    //   border: "1px solid transparent",
    //   borderRadius: "1px",
    //   boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    //   boxSizing: "border-box",
    //   MozBoxSizing: "border-box",
    //   fontSize: "14px",
    //   height: "32px",
    //   marginTop: "27px",
    //   outline: "none",
    //   padding: "0 12px",
    //   textOverflow: "ellipses",
    //   width: "400px"
    // }
    return (
      <section>
        <input className="input input-city" id="searchTextField" placeholder="Enter your city/address" type="text" /*onSubmit={} */></input>
        <input className="input input-date" id="searchDateField" type="date" placeholder="Pick a date"></input>
        { (this.props.showButton) && <button className="button get-started" onClick={() => this.props.handleGetStartedPress() }> Get Started </button> }
        { (!this.props.showButton) && <div> Range <input className="center" id="radiusInputField" defaultValue={2} type="range" min=".2" max="10" step=".2" /> </div> }
      </section>
    );
  }

}