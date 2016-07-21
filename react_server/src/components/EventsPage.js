import React, { Component } from 'react';
import $ from 'jquery';
import EventList from './EventList';
import Nav from './Nav';
import MapComponent from './MapComponent';
import SearchForm from './SearchForm';


export default class EventsPage extends Component {

  constructor(props) {
    super(props);
    if (props.events.length) { //if the ajax call completes before moving to this page
      var randomEvent = this.getRandomEvent(props.events); 
      this.state = {selectedEventIDs: [randomEvent.id], radius: 2, eventIdMousedOver: null, mapCenter: null};
    } else {
        this.state = {selectedEventIDs: [], radius: 2, eventIdMousedOver: null, mapCenter: null}
      }
  }

  componentWillUpdate(newProps, newState) {
    if(newState.wasEventMouseOver != true && newState.doit != true ) { //if anything but event mouse
      newState.doit = false;
      //this.setState({wasEventMouseOver: false})
    }
  }

  componentWillReceiveProps(newProps) {
    //set random event
    //debugger;
    if (!this.state.selectedEventIDs[0]) {
      var randomEvent = this.getRandomEvent(newProps.events);
      this.setState({ selectedEventIDs: [randomEvent.id].concat(this.state.selectedEventIDs) });
    }
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
    return events_array[0];
  }

  handleChangeInRadius(newRadius = 2) {
    this.setState({radius: newRadius});
  }

  handleEventCardMouseEnter(eventId) {
    this.setState({eventIdMousedOver: eventId, wasEventMouseOver: true, doit: true});
  }

  deselectEvent(id) {
    var new_array = this.state.selectedEventIDs.filter( function(eventID) {
        return id !== eventID;
      });
    this.setState({ selectedEventIDs: new_array });
  }

  handleEventCardClick(eventId) {
    var eventCard = this.props.events.find(function(event) { return event.id === eventId });
    console.log(eventCard);
    this.setState( {mapCenter: {lat: parseFloat(eventCard.latitude), lng: parseFloat(eventCard.longitude)}});
  }

  // toggle() {
  //   this.setState({hide: !this.state.hide});
  // }

  render() {
    console.log(this.state.wasEventMouseOver)
    return (
      <div>
        <Nav />
        <div className="columns">
          <div className="column is-one-third space_edit">
            <SearchForm 
              showButton={false}
              handleChangeInRadius={this.handleChangeInRadius.bind(this)}
              date={this.props.date}
              handleGeolocationPress={this.props.handleGeolocationPress}
              handleNewParams={this.props.handleNewParams}
              location={this.props.location}
              setAddress={this.props.setAddress}
              address={this.props.address}
              changeCenterOfMap={true}
              />
            <EventList
              events={this.props.events}
              selectedEventIDs={this.state.selectedEventIDs}
              handleEventCardMouseEnter={this.handleEventCardMouseEnter.bind(this)}
              deselectEvent={this.deselectEvent.bind(this)}
              onEventCardClick={this.handleEventCardClick.bind(this)}
              showLoadingGifMap={this.props.showLoadingGifMap}
            />
          </div>
          <div className='column is-two-thirds container-map' style={{height: "100%"}}>
            <MapComponent
              mapCenter={this.state.mapCenter}
              selectedEventIDs={this.state.selectedEventIDs}
              events={this.props.events}
              onMapMarkerClick={this.handleMapMarkerClick.bind(this)}
              defaultCenter={this.props.location}
              radius={this.state.radius}
              eventIdMousedOver={this.state.eventIdMousedOver}
              wasEventMouseOver={this.state.wasEventMouseOver}
              changeCenter={this.props.changeCenter}
            />
          </div>
        </div>
      </div>
    );
  }

}