import React, { Component } from 'react';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true
    }
  }

  // TODO - Write logic to render either HomePage or EventsPage
  switchPage() {
    this.setState({homePage: false});
  }

  render() {
    if (this.state.homePage) {
      return (
        <HomePage switchPage={this.switchPage.bind(this)}/>
      );
    } else {
      return (
        <EventsPage />
      );
    }
  }


}