import React, { Component } from 'react';
import GoogleMap from './components/google_map.js'

export default class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    var hStyle = {
      color: 'blue'
    }
    return (
      <div>
        <h1 style={hStyle}> Hello World, This is App.js </h1>
        <GoogleMap />
      </div>
    );
  }


}