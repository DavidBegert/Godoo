import React, { Component } from 'react';


export default class SearchForm extends Component {

  componentDidMount() {
   var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(28.70, -127.50), 
    new google.maps.LatLng(48.85, -55.90)
    );

    var input = document.getElementById('searchTextField');

    var searchBox = new google.maps.places.SearchBox(input, {
      bounds: defaultBounds
    });
  }
  
  static inputStyle = {
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


  render() {

    return (
      <input id="searchTextField" placeholder="Enter your address" type="text"></input>
    );
  }

}