import React, { Component } from 'react';
import EventCard from './EventCard';

export default class EventList extends Component {

  render() {
    // TODO display collection of EventCard items
    return (
      <div>
        <EventCard 
        title="PNE Summer Concert - Pat Benetar" 
        description="Every night at 8:30pm, the PNE Amphitheatre will present a summer full of the best music! Don't miss the sounds of Canada's-own, Juno-award winning The Sheepdogs! "
        start_time="2016-07-25 00:00:00"
        venue_name="West End Community Centre"
        venue_address="Lower Lounge"
        image_url="http://s1.evcdn.com/images/small/I0-001/030/042/400-6.jpeg_/digital-advertising-accelerator-bootcamp-00.jpeg"
        />
      </div>
    );
  }

}