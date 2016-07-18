import React, { Component } from 'react';


export default class SearchForm extends Component {

  componentDidMount() {
    var that = this;
    var location;
    var date;
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(28.70, -127.50), 
      new google.maps.LatLng(48.85, -55.90)
      );

      var cityInput = document.getElementById('searchTextField');
      var dateInput = document.getElementById('searchDateField');

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
              location = `${latitude}, ${longitude}`;
              that.props.makeCall(location, date);
              that.props.isTheCityAndDateFilledIn(location, date);
          } else {
              alert( 'Geocode was not successful because: ' + status );
          }
        });

      });

      dateInput.addEventListener('change', function() {
        console.log("date fired!!!");
        var dayInEventfulApiForm = dateInput.value.replace(/-/g, "") + "00";
        date = dayInEventfulApiForm + "-" + dayInEventfulApiForm;
        that.props.isTheCityAndDateFilledIn(location, date);
        that.props.makeCall(location, date);
      });
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
      </section>
    );
  }

}