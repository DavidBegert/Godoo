import React, { Component } from 'react';
import classnames from 'classnames';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';
import $ from 'jquery';
import { default as canUseDOM } from "can-use-dom";

//Also, put in logic if the place entered does not have any events. Show an error message. 

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure( () => { console.log("ERROR ERROR ERROR") });
      success(() => {console.log("YAY YAY YAY") });
    },
  }
);

var ajaxRequest;
export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true,
      events: [],
      mapCenter: null, //this is a default to vancouver
      showLoadingGif: false
    }
  }

  // TODO - Write logic to render either HomePage or EventsPage, fix the few bugs in the ajax request. (
  //like when they click a city and then click a date after the ajax request has finished... that needs some logic.)
  switchPage() {
    this.setState({homePage: false});
  };

  handleGeolocationPress() {
    //populate the place form with closest place
    this.setState({showLoadingGif: true});
    geolocation.getCurrentPosition((position) => {
      this.setState({mapCenter: {lat: position.coords.latitude, lng: position.coords.longitude }})
      this.setState({showLoadingGif: false});
    });
  }
  makeAjaxCall(location, date = "Today") {
    if (!location) {
      return;
    }

    if (ajaxRequest) {
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
      var today = yyyy+mm+dd+"00-"+yyyy+mm+dd+"00";
      if (date === today) { //if they clicked on todays date return since that request is already going through
        console.log("THIS HAS ALREADY BEEN REQUESTED NO WORRIES DAVE");
        return;
      }
      ajaxRequest.abort();
    }
    
    var lat = parseFloat(location.split(', ')[0]);
    var lng = parseFloat(location.split(', ')[1]);
    var mapCenter = {lat: lat, lng: lng};
    console.log("call made!");
    this.setState({mapCenter: mapCenter});
    ajaxRequest = $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: location,
        app_key: 'pVnn7M9Sk54FkgBf', //FFmssWtvRRfc9VF7
        page_size: 100,
        date: date,
        within: 10,
        unit: 'km',
        change_multi_day_start: true,
        include: 'categories,tickets',
        ex_category: 'learning_education,schools_alumni,conference,community,clubs_associations',
        sort_order: 'relevance'
      },
      success: function(response) {
        var results = response.events.event;
        // Filter out events with no description. They're usually crap.
        var goodResults = results.filter( function(event) {
          return event.description;
          });
        this.setState({ events: goodResults });
        ajaxRequest = null;
      }.bind(this)
    });
  }

  render() {
    if (this.state.homePage) {
      return (
        <HomePage makeCall={this.makeAjaxCall.bind(this)} 
        switchPage={this.switchPage.bind(this)} 
        handleGeolocationPress={this.handleGeolocationPress.bind(this)}
        currentPosition={this.state.mapCenter}
        showLoadingGif={this.state.showLoadingGif}
        />
      );
    } else {
      return (
        <EventsPage events={this.state.events} currentPosition={this.state.mapCenter} />
      );
    }
  }


}