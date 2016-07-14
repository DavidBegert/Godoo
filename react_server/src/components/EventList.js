import React, { Component } from 'react';
import EventCard from './EventCard';
import $ from 'jquery';

export default class EventList extends Component {


  render() {

    //TO DO: add default image
    var defaultImage = "http://thumb101.shutterstock.com/display_pic_with_logo/11994/253973893/stock-vector-event-word-cloud-business-concept-253973893.jpg";

    if (this.props.selectedEvents) {
      var eventCards = this.props.selectedEvents.map(function(event) {
        var description = event.description ? $(event.description).text() : "No description.";
        return (
          <EventCard 
            key={event.id}
            title={event.title}
            description={description.length > 300 ? description.slice(0, 300) + '...' : description}
            start_time={event.start_time}
            venue_name={event.venue_name}
            venue_address={event.venue_address}
            image_url={event.image ? event.image.small.url : defaultImage } 
          />
        )
      });
    }

    return (
      <div>
        {eventCards}
      </div>
    );
  }

}