import React, { Component } from 'react';
import FilterList from './components/FilterList.js';
import EventList from './components/EventList.js';

export default class SidePanel extends Component {

  render() {
    return (
      <div>
        <FilterList />
        <EventList />
      </div>
    );
  }

}