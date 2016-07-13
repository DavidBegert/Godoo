import React, { Component } from 'react';
import EventList from './EventList';
import Nav from './Nav';
import MapComponent from './MapComponent';

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
          <EventList />
          <MapComponent />
        </div>
      </div>
    );
  }

}