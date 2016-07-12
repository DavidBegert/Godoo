import React, { Component } from 'react';
import GoogleMapComponent from './components/google_map_component.jsx'

export default class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    var hStyle = {
      color: 'blue'
    }
    var exampleMarkers = [
      {
        position: { lat: 48.0112183, lng: -124.52067570000001 },
        key: "The Shop",
        defaultAnimation: 2,
        title: "The Shop is a concert hall event where you will be watching something cool!!!"
      },
      {
        position: {lat: 49, lng: -125},
        key: "Vancouver",
        defaultAnimation: 3,
        title: "The Vancouver mayor is having people over and it should be off the hook chain low bro."
      }
    ]
    return (
      <div>
        <h1 style={hStyle}> Hello World, This is App.js </h1>
        <GoogleMapComponent markers={exampleMarkers} />
      </div>
    );
  }


}