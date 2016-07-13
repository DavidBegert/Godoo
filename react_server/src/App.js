import React, { Component } from 'react';
import SidePanel from './components/SidePanel.js';
import Nav from './components/Nav.js';
import MapComponent from './components/MapComponent.js';

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
        <Nav />
        <div className="columns">
          <SidePanel />
          <MapComponent />
        </div>
      </div>
    );
  }


}