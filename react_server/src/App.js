import React, { Component } from 'react';
import EventCard from './components/EventCard.js';
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
          <EventCard />
          <MapComponent />
        </div>
      </div>
    );
  }


}