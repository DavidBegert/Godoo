import React, { Component } from 'react';
import EventCard from './EventCard';
import SearchForm from './SearchForm';

export default class EventList extends Component {


  render() {

    //TO DO: add default image
    var defaultImage = null;

    var theseEvents = [{
watching_count: null,
olson_path: "America/Vancouver",
calendar_count: null,
comment_count: null,
region_abbr: "BC",
postal_code: "4",
going_count: null,
all_day: "2",
latitude: "49.2900551",
groups: null,
url: "http://vancouver.eventful.com/events/basketball-camp-913-yrs-/E0-001-094532899-0?utm_source=apis&utm_medium=apim&utm_campaign=apic",
id: "E0-001-094532899-0",
privacy: "1",
city_name: "Vancouver",
link_count: null,
longitude: "-123.1256944",
country_name: "Canada",
country_abbr: "CAN",
region_name: "British Columbia",
start_time: "2016-07-25 00:00:00",
tz_id: null,
description: null,
modified: "2016-06-25 23:05:57",
venue_display: "1",
tz_country: null,
performers: null,
title: "Basketball Camp (9-13 yrs)",
venue_address: "480 Broughton Street",
geocode_type: "EVDB Geocoder",
tz_olson_path: null,
recur_string: null,
calendars: null,
owner: "evdb",
going: null,
country_abbr2: "CA",
image: null,
created: "2016-06-25 23:05:57",
venue_id: "V0-001-000206137-8",
tz_city: null,
stop_time: "2016-07-29 00:00:00",
venue_name: "Coal Harbour Community Centre (Downtown)",
venue_url: "http://vancouver.eventful.com/venues/coal-harbour-community-centre-downtown-/V0-001-000206137-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"
},
{
watching_count: null,
olson_path: "America/Vancouver",
calendar_count: null,
comment_count: null,
region_abbr: "BC",
postal_code: "4",
going_count: null,
all_day: "2",
latitude: "49.2900551",
groups: null,
url: "http://vancouver.eventful.com/events/day-camp-starfish-68-yrs-week-4-/E0-001-094543634-1?utm_source=apis&utm_medium=apim&utm_campaign=apic",
id: "E0-001-094543634-1",
privacy: "1",
city_name: "Vancouver",
link_count: null,
longitude: "-123.1256944",
country_name: "Canada",
country_abbr: "CAN",
region_name: "British Columbia",
start_time: "2016-07-25 00:00:00",
tz_id: null,
description: null,
modified: "2016-06-26 02:12:00",
venue_display: "1",
tz_country: null,
performers: null,
title: "Day Camp Starfish (6-8 yrs) - Week 4",
venue_address: "480 Broughton Street",
geocode_type: "EVDB Geocoder",
tz_olson_path: null,
recur_string: null,
calendars: null,
owner: "evdb",
going: null,
country_abbr2: "CA",
image: null,
created: "2016-06-26 02:12:00",
venue_id: "V0-001-000206137-8",
tz_city: null,
stop_time: "2016-07-29 00:00:00",
venue_name: "Coal Harbour Community Centre (Downtown)",
venue_url: "http://vancouver.eventful.com/venues/coal-harbour-community-centre-downtown-/V0-001-000206137-8?utm_source=apis&utm_medium=apim&utm_campaign=apic"
},
{
watching_count: null,
olson_path: "America/Vancouver",
calendar_count: null,
comment_count: null,
region_abbr: "BC",
postal_code: "V6G 1N6",
going_count: null,
all_day: "0",
latitude: "49.2921",
groups: null,
url: "http://vancouver.eventful.com/events/selftalk-stress-reduction-workshop-/E0-001-094918992-8?utm_source=apis&utm_medium=apim&utm_campaign=apic",
id: "E0-001-094918992-8",
privacy: "1",
city_name: "Vancouver",
link_count: null,
longitude: "-123.142",
country_name: "Canada",
country_abbr: "CAN",
region_name: "British Columbia",
start_time: "2016-09-18 10:00:00",
tz_id: null,
description: "Please join facilitator Maryse Cardin for a workshop that will focus on self-talk for stress reduction. Come learn self-talk tools that will help you feel less pressure and a greater sense of calm and wellbeing. The workshop is on September 18 from 10 a.m. to 3 p.m. and will be held at Silhouette Studio, 2050 Nelson St., Vancouver (next to Stanley Park). This will be a small group setting with limited space and registration is required. To register, please e-mail: selftalklove@gmail.com or visit the website: www.selftalklove.com. The cost of this workshop is $65. Maryse Cardin has a master’s degree in communication and has worked at several universities, where she conducted research into the power of self-talk. Her workshops combine elements from intrapersonal communication theory, psychology, sports psychology, coaching, Zen Buddhism and other positive-thinking approaches. She combines positive self-talk with physical movement to help clients and workshop participants to transform limiting beliefs and live their best life.",
modified: "2016-07-11 12:04:50",
venue_display: "1",
tz_country: null,
performers: null,
title: "Self-Talk for Stress Reduction Workshop",
venue_address: "2050 Nelson St.",
geocode_type: "Zip Code Based GeoCodes",
tz_olson_path: null,
recur_string: null,
calendars: null,
owner: "lhanley1",
going: null,
country_abbr2: "CA",
image: null,
created: "2016-07-11 09:55:49",
venue_id: "V0-001-010202606-2",
tz_city: null,
stop_time: "2016-09-18 15:00:00",
venue_name: "Silhouette Studio",
venue_url: "http://vancouver.eventful.com/venues/silhouette-studio-/V0-001-010202606-2?utm_source=apis&utm_medium=apim&utm_campaign=apic"
}];

var eventCards = theseEvents.map(function(event) {
  return <EventCard 
    title={event.title}
    description={event.description}
    start_time={event.start_time}
    venue_name={event.venue_name}
    venue_address={event.venue_address}
    image_url={event.image ? event.image.small.url : null} 
  />
});


    // TODO display collection of EventCard items
    return (
      <div className="column is-one-third">
        {eventCards}
      </div>
    );
  }

}