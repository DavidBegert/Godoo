import React, { Component } from 'react';

export default class GoogleMap extends Component {

  render() {
    var mapStyles = {
      height: '100%'
    }
    // var eventAddresses = [
    //   {lat: 50.397, lng: -123.644},
    //   {lat: 48.593, lng: -124.002},
    //   {lat: 49.221, lng: -122.982}
    // ]
    return (
      <div id='map' style={mapStyles}>
      </div>
    );
  }




};