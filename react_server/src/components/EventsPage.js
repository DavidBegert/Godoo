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
      function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var randomEvent = this.props.events[getRandomIntInclusive(0, this.props.events.length)];
      this.state = {selectedEventIDs: [randomEvent.id]};
    } else {
        this.state = {selectedEventIDs: []}
      }
  }

  componentWillReceiveProps(newProps) {
    //set random event
    console.log("PROPS RECIEVING");
    function getRandomIntInclusive(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //debugger;
    var randomEvent = newProps.events[getRandomIntInclusive(0, newProps.events.length)];
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

  render() {
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-third space_edit">
             <SearchForm showButton={false}/>
             <EventList
               events={this.props.events}
               selectedEventIDs={this.state.selectedEventIDs}
            />
          </div>
          <div className='column is-two-thirds container-map  map-button' style={{height: "100%"}}>
            <MapComponent
              selectedEventIDs={this.state.selectedEventIDs}
              events={this.props.events}
              onMapMarkerClick={this.handleMapMarkerClick.bind(this)}
              defaultCenter={this.props.currentPosition}
            />
          </div>
        </div>
      </div>
    );
  }

}