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
      events: []
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
        var results = response.events.event;
        console.log(results);
        this.setState({ events: results });
      }.bind(this)
    });
  };

  render() {
    var hStyle = {
      color: 'blue'
    }
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-third">
            <SearchForm />
            <EventList events={this.state.events} />
          </div>
          <div className='column is-two-thirds' style={{height: "100%"}}>
            <MapComponent events={this.state.events} />
          </div>
        </div>
      </div>
    );
  }

}