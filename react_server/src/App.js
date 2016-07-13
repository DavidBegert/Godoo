import React, { Component } from 'react';
import SidePanel from './components/SidePanel';
import Nav from './components/Nav';
import MapComponent from './components/MapComponent';

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