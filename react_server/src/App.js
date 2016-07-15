import React, { Component } from 'react';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';
import $ from 'jquery';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true,
      events: [],
      selectedEvents: [],
      mapCenter: {lat: 49.2827, lng: -123.1207}
    }
  }

  // TODO - Write logic to render either HomePage or EventsPage
  switchPage() {
    this.setState({homePage: false});
  };

  makeAjaxCall(location) {
    console.log("CALL MADE");
    var lat = parseFloat(location.split(', ')[0]);
    var lng = parseFloat(location.split(', ')[1]);
    var mapCenter = {lat: lat, lng: lng};
    this.setState({mapCenter: mapCenter});
    $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: location,
        app_key: 'pVnn7M9Sk54FkgBf', //FFmssWtvRRfc9VF7
        page_size: 100,
        date: "Today",
        within: 1,
        change_multi_day_start: true,
        include: 'categories',
        ex_category: 'learning_education,schools_alumni,conference,community,family_fun_kids,clubs_associations',
        category: 'comedy,food,music,festivals_parades,movies_film,fundraisers,art,support,holiday,books,attractions,business,singles_social,outdoors_recreation,performing_arts,animals,politics_activism,sales,science,religion_spirituality,sports,technology,other',
      },
      success: function(response) {
        function getRandomIntInclusive(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var results = response.events.event;
        console.log(results);
        // this.state.selectedEvents.unshift(results[getRandomIntInclusive(0, results.length)]);
        this.setState(function(previousState) { 
          var randomEvent = results[getRandomIntInclusive(0, results.length)];
          return {
            events: results,
            selectedEvents: [randomEvent, ...previousState.selectedEvents],
          }
        });
        //debugger;
      }.bind(this)
    });
  };

  handleMapMarkerClick(marker) {
    this.state.selectedEvents.unshift(marker);
    this.setState(this.state);
  }

  render() {
    if (this.state.homePage) {
      return (
        <HomePage makeCall={this.makeAjaxCall.bind(this)} switchPage={this.switchPage.bind(this)}/>
      );
    } else {
      return (
        <EventsPage handleMapMarkerClick={this.handleMapMarkerClick.bind(this)} events={this.state.events} selectedEvents={this.state.selectedEvents} currentPosition={this.state.mapCenter} />
      );
    }
  }


}