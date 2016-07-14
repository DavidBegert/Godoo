import React, { Component } from 'react';
import Filters from './Filters';
import EventList from './EventList';

export default class SidePanel extends Component {

  render() {
    return (
      <div>
        <Filters />
        <EventList />
      </div>
    );
  }

}