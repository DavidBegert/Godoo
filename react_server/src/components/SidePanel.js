import React, { Component } from 'react';
import FilterList from './FilterList';
import EventList from './EventList';

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