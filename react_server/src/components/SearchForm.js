import React, { Component } from 'react';


export default class SearchForm extends Component {

  componentDidMount() {
    var that = this;
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(28.70, -127.50), 
      new google.maps.LatLng(48.85, -55.90)
      );

      var input = document.getElementById('searchTextField');

      var searchBox = new google.maps.places.SearchBox(input, {
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
              that.props.makeCall(`${latitude}, ${longitude}`);
          } else {
              alert( 'Geocode was not successful because: ' + status );
          }
        });


      });
  }

  render() {
    var inputStyle = {
      border: "1px solid transparent",
      borderRadius: "1px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      MozBoxSizing: "border-box",
      fontSize: "14px",
      height: "32px",
      marginTop: "27px",
      outline: "none",
      padding: "0 12px",
      textOverflow: "ellipses",
      width: "400px"
    }
    return (
      <input style={inputStyle} id="searchTextField" placeholder="Enter your address" type="text" onSubmit={console.log('hello')}></input>
    );
  }

}