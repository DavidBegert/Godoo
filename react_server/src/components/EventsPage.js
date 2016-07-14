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
      events: [{  
                watching_count: null,
                olson_path: "America/Vancouver",
                calendar_count: null,
                comment_count: null,
                region_abbr: "BC",
                postal_code: null,
                going_count: null,
                all_day: "2",
                latitude: "49.2505",
                groups: null,
                url: "http://vancouver.eventful.com/events/summer-escape-week-4-/E0-001-094329963-0?utm_source=apis&utm_medium=apim&utm_campaign=apic",
                id: "E0-001-094329963-0",
                privacy: "1",
                city_name: "Vancouver",
                link_count: null,
                longitude: "-123.112",
                country_name: "Canada",
                country_abbr: "CAN",
                region_name: "British Columbia",
                start_time: "2016-07-25 00:00:00",
                tz_id: null,
                description: null,
                modified: "2016-07-01 02:51:59",
                venue_display: "1",
                tz_country: null,
                performers: null,
                title: "Summer Escape - Week 4",
                venue_address: "Lower Lounge",
                geocode_type: "City Based GeoCodes",
                tz_olson_path: null,
                recur_string: null,
                calendars: null,
                owner: "evdb",
                going: null,
                country_abbr2: "CA",
                image: null,
                created: "2016-06-20 02:16:09",
                venue_id: "V0-001-001303277-0",
                tz_city: null,
                stop_time: "2016-07-29 00:00:00",
                venue_name: "West End Community Centre",
                venue_url: "http://vancouver.eventful.com/venues/west-end-community-centre-/V0-001-001303277-0?utm_source=apis&utm_medium=apim&utm_campaign=apic"
              }]
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
        this.state = ({ events: results });
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
          <MapComponent />
        </div>
      </div>
    );
  }

}