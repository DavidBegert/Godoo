import React, { Component } from 'react';
import EventCard from './EventCard';

export default class EventList extends Component {


  render() {

    //TO DO: add default image
    var defaultImage = null;
    if (this.props.selectedEvents) {
      var eventCards = this.props.selectedEvents.map(function(event) {
        return <EventCard 
          key={event.id}
          title={event.title}
          description={event.description}
          start_time={event.start_time}
          venue_name={event.venue_name}
          venue_address={event.venue_address}
          image_url={event.image ? event.image.small.url : defaultImage } 
        />
      });
  }

    // TODO display collection of EventCard items
    return (
      <div>
        {eventCards}
      </div>
    );
  }

}