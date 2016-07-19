import React, { Component } from 'react';
import classnames from 'classnames';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';
import $ from 'jquery';

//TODO implement the geolocation option. (commented out below). 
//Also, put in logic if the place entered does not have any events. Show an error message. 

// const geolocation = (
//   canUseDOM && navigator.geolocation || {
//     getCurrentPosition: (success, failure) => {
//       failure( () => { console.log("ERROR ERROR ERROR") });
//       success(() => {console.log("YAY YAY YAY") });
//     },
//   }
// );

function getTodaysDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  } 
  if(mm<10) {
      mm='0'+mm
  } 
  return yyyy+mm+dd+"00-"+yyyy+mm+dd+"00";
}

var currentAjaxRequest = {};

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true,
      events: [],
      mapCenter: {lat: 49.2827, lng: -123.1207} //this is a default to vancouver
      today: getTodaysDate(),
    }
  }

  // TODO - Write logic to render either HomePage or EventsPage, fix the few bugs in the ajax request. (
  //like when they click a city and then click a date after the ajax request has finished... that needs some logic.)
  switchPage() {
    this.setState({homePage: false});
  };

  makeAjaxCall(location, date = this.state.today, page_number = 1) {
    /* 
      geolocation.getCurrentPosition((position) => {
        this.setState({currentPosition: {lat: position.coords.latitude, lng: position.coords.longitude }})
      })
    */

    if (location === undefined) {
      console.log("no location");
      return;
    }

    if (currentAjaxRequest.promise) {

      if (date === currentAjaxRequest.settings.date && location === currentAjaxRequest.settings.location) { //if they clicked on todays date return since that request is already going through
        console.log("THIS HAS ALREADY BEEN REQUESTED NO WORRIES DAVE");
        return;
      }
      currentAjaxRequest.promise.abort();
      console.log("currentAjaxRequest abortted");
    }
    console.log("CALL MADE");
    var lat = parseFloat(location.split(', ')[0]);
    var lng = parseFloat(location.split(', ')[1]);
    var mapCenter = {lat: lat, lng: lng};
    this.setState({mapCenter: mapCenter});
    currentAjaxRequest.promise = $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: location,
        app_key: 'pVnn7M9Sk54FkgBf', //FFmssWtvRRfc9VF7
        page_size: 100,
        page_number: 1,
        date: date,
        within: 10,
        unit: 'km',
        change_multi_day_start: true,
        include: 'categories,tickets',
        ex_category: 'learning_education,schools_alumni,conference,community,clubs_associations',
        sort_order: 'relevance'
      },
      beforeSend: function(jqXHR, settings) {
        currentAjaxRequest.settings = {date, location};
        console.log(currentAjaxRequest);
      },
      success: function(response) {
        var results = response.events.event;
        console.log(results);
        // Filter out events with no description. They're usually crap.
        var goodResults = results.filter( function(event) {
          return event.description;
          });
        console.log(goodResults);
        this.setState({ events: goodResults });
        currentAjaxRequest = {};
      }.bind(this)
    });
  }

  // handleMapMarkerClick(marker) {
  //   this.state.selectedEvents.unshift(marker);
  //   this.setState(this.state);
  // }

  render() {
    if (this.state.homePage) {
      return (
        <HomePage makeCall={this.makeAjaxCall.bind(this)} switchPage={this.switchPage.bind(this)}/>
      );
    } else {
      return (
        <EventsPage events={this.state.events} currentPosition={this.state.mapCenter} />
      );
    }
  }


}