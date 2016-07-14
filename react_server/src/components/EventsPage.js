import React, { Component } from 'react';
import $ from 'jquery';
import EventList from './EventList';
import Nav from './Nav';
import MapComponent from './MapComponent';
import SearchForm from './SearchForm';

export default class EventsPage extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      selectedEvents: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: "49.2788,-123.1139",
        app_key: 'FFmssWtvRRfc9VF7',
        page_size: 100,
        date: "Today",
        within: 1,
        change_multi_day_start: true,
        ex_category: 'learning_education,schools_alumni,conference,community,family_fun_kids,clubs_associations',
        category: 'comedy,food,music,festivals_parades,movies_film,fundraisers,art,support,holiday,books,attractions,business,singles_social,outdoors_recreation,performing_arts,animals,politics_activism,sales,science,religion_spirituality,sports,technology,other',
      },
      success: function(response) {
        // function getRandomIntInclusive(min,max) {
        //   return Math.floor(Math.random() * (max - min + 1)) + min;
        // }
        var results = response.events.event;
        console.log(results);
        this.setState({ events: results /*, selectedEvents: results[getRandomIntInclusive(0, results.length) ] */});
      }.bind(this)
    });
  };

    handleMapMarkerClick(marker) {
      console.log('marker click handled');
      console.log(this.state.selectedEvents);
      this.state.selectedEvents.unshift(marker);
      this.setState(this.state);
    }

  render() {
    console.log("selected events: ");
    console.log(this.state.selectedEvents);
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-third">
            <SearchForm />
            <EventList selectedEvents={this.state.selectedEvents} />
          </div>
          <div className='column is-two-thirds' style={{height: "100%"}}>
            <MapComponent events={this.state.events} selectedEvents={this.state.selectedEvents} handleMapMarkerClick={this.handleMapMarkerClick.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

}