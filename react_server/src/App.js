import React, { Component } from 'react';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  // TODO - Write logic to render either HomePage or EventsPage

  render() {
    var hStyle = {
      color: 'blue'
    }
    return (
      <EventsPage />
    );
  }


}