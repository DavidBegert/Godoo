import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer, DrawingManager} from "react-google-maps";
import Filters from "./Filters";
import $ from 'jquery';


export default class GoogleMapContent extends Component {

//TO DO : add whitespace in place of removed html tags
//TO DO : work on how to show the routes.. maybe stop zoom in and stuff.
  constructor(props) {
    super(props);
    this.state = {
      previousMarker: null,
      filteredCategories: [],
      radiusOfMarkers: 2,
      markerIdToBounce: null,
      directions: null,
      showDirections: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.radius != this.state.radiusOfMarkers){
      this.setState({radiusOfMarkers: newProps.radius, markerIdToBounce: null})  //continue from here. 
    } 
    else {
      if(newProps.wasEventMouseOver && false){  //if it was an event card mousedOver
        this.setState({markerIdToBounce: newProps.eventIdMousedOver});
      } else {
        this.setState({markerIdToBounce: null});
      }
    }
    if (newProps.mapCenter != this.props.mapCenter) {
      this.refs.map.panTo(newProps.mapCenter);
      this.onEventCardClickForMap(newProps.mapCenter);
    }

  }

  handleFilterClick(category) {
    this.setState(function(previousState) {
      var newFilterSet;

      if (previousState.filteredCategories.includes(category)) { //taking away category
        newFilterSet = previousState.filteredCategories.filter(function(filterCategory) {
          return filterCategory != category;
        });
      }
      else { //adding category
        newFilterSet = [...previousState.filteredCategories, category];
      }
      return {filteredCategories: newFilterSet};
    });
  }
  onEventCardClickForMap(mapCenter) { 
    //add route
    this.setState({showDirections: true});
    // if (!marker.showInfo) {
      //show directions to marker
      var DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: this.props.defaultCenter,
        destination: mapCenter,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
  }

  onMarkerClick(marker) { 
    //add route
    this.setState({showDirections: true});
    // if (!marker.showInfo) {
      console.log(marker);
      //show directions to marker
      var DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: this.props.defaultCenter,
        destination: {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)},
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
      //end of showing directions
      this.props.onMapMarkerClick(marker);
    //   marker.showInfo = true;
    //   // if (this.state.previousMarker && this.state.previousMarker != marker){ 
    //   //   this.state.previousMarker.showInfo = false;
    //   // }
    //   this.setState({previousMarker: marker});
    // } else {
    //   marker.showInfo = false;
    // }
    // // this.setState(this.state);
  };

  getAnimation(marker) {
    if(marker.id === this.state.markerIdToBounce){
      return 4;
    }
  }

  renderInfoWindow(marker) {
    return (
      <InfoWindow onCloseclick={() => this.onMarkerClick(marker)} > 
        <div style={{width: "500px", maxHeight: "100px"}}>
          <strong>{marker.title}</strong>
          <p>{marker.description ? $('<div>' + marker.description + '</div>').text() : "No description."}</p>
        </div> 
      </InfoWindow>
      
    );
  };

  distanceBetween(origin, marker) {
    var rad = function(x) {
      return x * Math.PI / 180;
    };
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(marker.latitude - origin.lat);
    var dLong = rad(marker.longitude - origin.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(origin.lat)) * Math.cos(rad(marker.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (d / 1000.0); // returns the distance in kilometers
  };

  infoWindow() {
    return (
      <InfoWindow 
        onCloseclick={() => this.setState({showDirections: false})} 
        position={this.state.directions.routes[0].legs[0].steps[Math.floor(this.state.directions.routes[0].legs[0].steps.length/2)].end_location}> 
        {this.state.directions.routes[0].legs[0].distance.text + "<br>" + this.state.directions.routes[0].legs[0].duration.text + " "} 
        </InfoWindow> 
      );
  }

  render() {
    var centerProps = {
      center: this.props.defaultCenter,
    }
    if (!this.props.changeCenter) { centerProps = null };
    if (this.props.events) {  
      return (
          <div>
            <div id="right-panel"></div>
            <GoogleMapLoader
              containerElement={
                <div
                  id = 'mapDiv'
                  //{...this.props}
                  style={{
                    height: "100%",
                  }} > 
                </div>
              }
              googleMapElement={
      
                <GoogleMap
                  ref='map'
                  defaultZoom={13}
                  defaultCenter={this.props.defaultCenter}
                  {...centerProps}
                >

                <Filters onFilterClick={this.handleFilterClick.bind(this)}/>
                <Marker
                  key="userLocation"
                  position={this.props.defaultCenter} //marker.position
                  title="This is where you are"
                  icon={"http://www.younicycle.com/imgs/younicycle_com/blue_dot_16.png"}
                  //visible={false}
                  // onMouseover={() => this.onMarkerClick(marker) }
                  // onMouseleave={() => this.handleMarkerLeave(marker) }
                  /> 
                {this.props.events.map((marker, index) => {  //this.state.markers.map
                  if (this.state.filteredCategories.length == 0 && this.distanceBetween(this.props.defaultCenter, marker) <= this.state.radiusOfMarkers || this.state.filteredCategories.includes(marker.categories.category[0].id) || this.props.selectedEventIDs.includes(marker.id)) {
                    return (
                      <Marker
                        key={index}
                        position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) } } //marker.position
                        title={ marker.title }//marker.title
                        onClick={() => this.onMarkerClick(marker)} 
                        animation={this.getAnimation(marker)}
                        //icon={"https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300"}
                        //visible={false}
                        // onMouseover={() => this.onMarkerClick(marker) }
                        // onMouseleave={() => this.handleMarkerLeave(marker) }
                      > 

                        { /*marker.showInfo ? this.renderInfoWindow(marker) : null*/ }

                      </Marker>
                    );
                  }
                })
              }
                <Circle
                  options={{
                    strokeColor: "green",
                    strokeOpacity: 0.8,
                    fillColor: "green",
                    fillOpacity: .25,
                    strokeWeight: 1,
                    center: this.props.defaultCenter,
                    radius: this.state.radiusOfMarkers * 1000,
                  }}
                /> 

                {this.state.directions ? <DirectionsRenderer options={{preserveViewport: true, suppressMarkers: true}} directions={this.state.directions}/*panel={document.getElementById('right-panel')} *//> : null}
                {(this.state.directions && this.state.showDirections) ? this.infoWindow() : null }


              </GoogleMap>
              }
            />
          </div>);
    }
    return (<h2> <br/><br/>Loading... </h2>)
  }

};
