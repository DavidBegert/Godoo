import React, { Component } from 'react';
import $ from 'jquery';
import EventList from './EventList';
import Nav from './Nav';
import MapComponent from './MapComponent';
import SearchForm from './SearchForm';
import { default as canUseDOM } from "can-use-dom";


export default class EventsPage extends Component {

  constructor(props) {
    super(props);
    if (props.events.length) { //if the ajax call completes before moving to this page
      var randomEvent = this.getRandomEvent(props.events); 
      this.state = {selectedEventIDs: [randomEvent.id], radius: 2, eventIdMousedOver: null};
    } else {
        this.state = {selectedEventIDs: [], radius: 2, eventIdMousedOver: null}
      }
  }

  componentWillReceiveProps(newProps) {
    //set random event
    console.log("PROPS RECIEVING");
    //debugger;
    var randomEvent = this.getRandomEvent(newProps.events);
    this.setState({ selectedEventIDs: [randomEvent.id] });
  };

  handleMapMarkerClick(marker) {
    this.setState((previousState) => {
      var eventIdIndex = previousState.selectedEventIDs.indexOf(marker.id);
      if (eventIdIndex > -1) {
        previousState.selectedEventIDs.splice(eventIdIndex, 1);
      }
      return {selectedEventIDs: [marker.id, ...previousState.selectedEventIDs]}
    });
  }

  getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomEvent(events_array) {
    return events_array[this.getRandomIntInclusive(0, this.props.events.length - 1)];
  }

  handleChangeInRadius(newRadius = 2) {
    this.setState({radius: newRadius});
  }

  handleEventCardMouseEnter(eventId) {
    this.setState({eventIdMousedOver: eventId});
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-third space_edit">
            <SearchForm showButton={false} handleChangeInRadius={this.handleChangeInRadius.bind(this)}/>
            <EventList
              events={this.props.events}
              selectedEventIDs={this.state.selectedEventIDs}
              handleEventCardMouseEnter={this.handleEventCardMouseEnter.bind(this)}
            />
          </div>
          <div className='column is-two-thirds container-map' style={{height: "100%"}}>
            <MapComponent
              selectedEventIDs={this.state.selectedEventIDs}
              events={this.props.events}
              onMapMarkerClick={this.handleMapMarkerClick.bind(this)}
              defaultCenter={this.props.currentPosition}
              radius={this.state.radius}
              eventIdMousedOver={this.state.eventIdMousedOver}
            />
          </div>
        </div>
      </div>
    );
  }

}