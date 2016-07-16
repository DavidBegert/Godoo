import React, { Component } from 'react';
import EventsPage from './components/EventsPage.js';
import HomePage from './components/HomePage.js';
import $ from 'jquery';

// const geolocation = (
//   canUseDOM && navigator.geolocation || {
//     getCurrentPosition: (success, failure) => {
//       failure( () => { console.log("ERROR ERROR ERROR") });
//       success(() => {console.log("YAY YAY YAY") });
//     },
//   }
// );



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      homePage: true,
      events: [],
      mapCenter: {lat: 49.2827, lng: -123.1207}
    }
  }

  // TODO - Write logic to render either HomePage or EventsPage
  switchPage() {
    this.setState({homePage: false});
  };

  makeAjaxCall(location) {
    /* 
      geolocation.getCurrentPosition((position) => {
        this.setState({currentPosition: {lat: position.coords.latitude, lng: position.coords.longitude }})
      })
    */
    var that = this;
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
        var results = response.events.event;
        console.log(results);
        that.setState({events: results});
      }//.bind(this)
    });
  };

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