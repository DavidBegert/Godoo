import React, { Component } from 'react';
import FilterList from './components/FilterList.js';
import FilterItem from './components/FilterItem.js';
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
          <FilterList />
          <FilterItem />
          <EventCard />
          <MapComponent />
        </div>
      </div>
    );
  }


}