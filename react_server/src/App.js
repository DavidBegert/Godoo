import React, { Component } from 'react';
import GoogleMap from './components/google_map.js'

export default class App extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <h1> Hello World, This is App.js </h1>
        <GoogleMap />
      </div>
    );
  }


}