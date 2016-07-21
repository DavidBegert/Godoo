import React, { Component } from 'react';
import classnames from 'classnames';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';
import $ from 'jquery';
import { default as canUseDOM } from "can-use-dom";

//TODO - put in logic if the place entered does not have any events. Show an error message. 

var currentAjaxRequest = {};

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure( () => { console.log("ERROR ERROR ERROR") });
      success(() => {console.log("YAY YAY YAY") });
    },
  }
);

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true,
      events: [],
      userLocation: null,
      date: new Date().toISOString().slice(0,10),
      location: null,
      address: null,
      showLoadingGifHome: false,
      showLoadingGifMap: false,
      changeCenter: false
    }
  }

  convertDateForAjax(date) {
    date = date.split('-').join('') + '00'
    return date + "-" + date;
  }

  // TODO - Write logic to render either HomePage or EventsPage, fix the few bugs in the ajax request. (
  //like when they click a city and then click a date after the ajax request has finished... that needs some logic.)
  switchPage() {
    this.setState({homePage: false, showLoadingGifMap: true}); // hack fix
  };

  handleGeolocationPress() {
    //populate the place form with closest place
    this.setState({showLoadingGifHome: true, showLoadingGifMap: true});
    geolocation.getCurrentPosition((position) => {
      var locationObject= {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) }
      this.handleNewParams(locationObject, this.state.date, true)
      this.setState({showLoadingGifHome: false, showLoadingGifMap: false});
    });
  }

  handleNewParams(location, date, changeCenter) {
    if (this.state.location !== location || this.state.date !== date) {
      this.setState({location, date, changeCenter});
      this.setState({changeCenter: false})
      this.makeAjaxCall(location, date);
    }
  }

  setAddress(address) {
    this.setState({address});
  }

  makeAjaxCall(location = this.state.location, date = this.state.date, page_number = 1, showingLoadingGif = true) {
    date = this.convertDateForAjax(date);
    if (!location) {
      return;
    }

    if (currentAjaxRequest.promise) {

      if (date === currentAjaxRequest.settings.date && location === currentAjaxRequest.settings.location) { 
        return;
      }
      currentAjaxRequest.promise.abort();
    }
    console.log("call made!");
    currentAjaxRequest.settings = {date, location};
    if(showingLoadingGif) {console.log('setting to true!!!'); this.setState({showLoadingGifMap: true}) };
    currentAjaxRequest.promise = $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: location.lat + ',' + location.lng,
        app_key: 'pVnn7M9Sk54FkgBf', //FFmssWtvRRfc9VF7
        page_size: 100,
        page_number: page_number,
        date: date,
        within: 10,
        unit: 'km',
        change_multi_day_start: true,
        include: 'categories,tickets',
        ex_category: 'learning_education,schools_alumni,conference,community,clubs_associations',
        sort_order: 'relevance'
      },
      success: function(response) {
        if (!response.events) {
          return;
        }
        var results = response.events.event;
        // Filter out events with no description. They're usually crap.
        var goodResults = results.filter( function(event) {
          return event.description;
          });
        this.setState({ events: (page_number == 1) ? goodResults.concat(this.state.events) : this.state.events.concat(goodResults) });
        console.log(this.state.events);
        console.log("SETTING TO FALSE")
        this.setState({showLoadingGifMap: false}); //stop showing loading gif
        currentAjaxRequest = {};
        this.makeAjaxCall(this.state.location, this.state.date, page_number + 1, false);
      }.bind(this),
      error: function(xhr, textStatus, errorThrown) {
        console.log(xhr);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  }

  render() {
    if (this.state.homePage) {
      return (
        <HomePage 
          switchPage={this.switchPage.bind(this)}
          date={this.state.date}
          handleGeolocationPress={this.handleGeolocationPress.bind(this)}
          currentPosition={this.state.userLocation}
          location={this.state.location}
          showLoadingGifHome={this.state.showLoadingGifHome}
          handleNewParams={this.handleNewParams.bind(this)}
          setAddress={this.setAddress.bind(this)}
          address={this.state.address}
        />
      );
    } else {
      return (
        <EventsPage
          events={this.state.events}
          currentPosition={this.state.userLocation}
          date={this.state.date}
          handleGeolocationPress={this.handleGeolocationPress.bind(this)}
          handleNewParams={this.handleNewParams.bind(this)}
          location={this.state.location}
          setAddress={this.setAddress.bind(this)}
          address={this.state.address}
          changeCenter={this.state.changeCenter}
          showLoadingGifMap={this.state.showLoadingGifMap}
        />
      );
    }
  }


}