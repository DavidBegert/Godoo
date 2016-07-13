import React, { Component } from 'react';
import EventList from './components/EventList';
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
          <EventList />
          <MapComponent />
        </div>
      </div>
    );
  }

}