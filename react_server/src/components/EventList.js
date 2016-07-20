import React, { Component } from 'react';
import EventCard from './EventCard';
import $ from 'jquery';

export default class EventList extends Component {

  render() {
  //TO DO : FIgure out what to do with events that have start and end time as 12am (some are all day but dunno when they close and stuff)
    function formatDate(startTime, endTime) {
      var formattedDate = new Date(startTime);
      if (formattedDate.getHours() >= 12) {
        var hours = formattedDate.getHours() - 12 || 12;
        return (hours + "pm " + formattedDate.toString().slice(0,16));
      } else {

        var hours = formattedDate.getHours();
        if (hours === 0) {
          return "All Day"
        }
        return (hours + "am " + formattedDate.toString().slice(0,16));
      }
    }
    var defaultImage = "http://thumb101.shutterstock.com/display_pic_with_logo/11994/253973893/stock-vector-event-word-cloud-business-concept-253973893.jpg";

    if (this.props.selectedEventIDs.length) {
      var eventCards = this.props.selectedEventIDs.map((eventId) => {
        var event = this.props.events.find((associatedEvent) => {
          return associatedEvent.id === eventId;
        });
        var description = event.description ? event.description : "No description.";
        description = $('<div>' + event.description + '</div>').text();
        return (
          <EventCard 
            key={event.id}
            id={event.id}
            title={event.title}
            description={description.length > 300 ? description.slice(0, 300) + '...' : description}
            start_time={formatDate(event.start_time, event.stop_time)}
            venue_name={event.venue_name}
            venue_address={event.venue_address}
            image_url={event.image ? event.image.small.url : defaultImage } 
            handleEventCardMouseEnter={this.props.handleEventCardMouseEnter}
            deselectEvent={this.props.deselectEvent}
          />
        )
      });
      return (
        <div>
          {eventCards}
        </div>
      );
    } else {
        return (
          <div>
            <br/>
            <img src="https://66.media.tumblr.com/d799ad55c1a36417ef381ee48385987a/tumblr_o204gziLrm1v6xy94o1_400.gif" />
          </div>
        );
    }
  }

}