import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow, Circle, DirectionsRenderer} from "react-google-maps";
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
    this.setState({showDirections: false});
    if (newProps.radius != this.state.radiusOfMarkers){
      this.setState({radiusOfMarkers: newProps.radius, markerIdToBounce: null})  //continue from here. 
    } 
    else {
      if(this.props.selectedEventIDs === newProps.selectedEventIDs){  //if it was an event card mousedOver
        this.setState({markerIdToBounce: newProps.eventIdMousedOver});
      } else {
        this.setState({markerIdToBounce: null});
      }
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

  onMarkerClick(marker) { 
    //add route
    // var directionsService = new google.maps.DirectionsService();
    // var directionsDisplay = new google.maps.DirectionsRenderer();

    // var destination = {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)};
    // console.log(this.props.defaultCenter);
    // console.log(destination);
    // var request = {
    //     origin: this.props.defaultCenter,
    //     destination: {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)},
    //     travelMode: google.maps.DirectionsTravelMode.WALKING
    // };

    // directionsService.route(request, function (response, status) {
    //   if (status == google.maps.DirectionsStatus.OK) {
    //       directionsDisplay.setDirections(response);
    //       console.log(response.routes[0])
    //       var route = response.routes[0];
    //       this.setState({path: route});
    //   }
    // }.bind(this));

    //this.props.defaultCenter
    this.setState({showDirections: true});
    if (!marker.showInfo) {
      console.log(marker);
      //show directions to marker
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: this.props.defaultCenter,
        destination: {lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)},
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log('setting state of map');
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
      //end of showing directions
      this.props.onMapMarkerClick(marker);
      marker.showInfo = true;
      if (this.state.previousMarker && this.state.previousMarker != marker){ 
        this.state.previousMarker.showInfo = false;
      }
      this.setState({previousMarker: marker});
    } else {
      marker.showInfo = false;
    }
    this.setState(this.state);
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

  render() {

    if (this.props.events) {  
      return (
          <div>
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
                {/*<DrawingManager
                  defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
                  defaultOptions={{
                    drawingControl: true,
                    drawingControlOptions: {
                      position: google.maps.ControlPosition.TOP_CENTER,
                      drawingModes: [
                        google.maps.drawing.OverlayType.CIRCLE,
                        google.maps.drawing.OverlayType.POLYGON,
                        google.maps.drawing.OverlayType.POLYLINE,
                        google.maps.drawing.OverlayType.RECTANGLE,
                      ],
                    },
                    circleOptions: {
                      fillColor: `#ffff00`,
                      fillOpacity: 1,
                      strokeWeight: 5,
                      clickable: false,
                      editable: true,
                      zIndex: 1,
                    },
                  }}
                /> */}
                {this.state.directions && this.state.showDirections ? <DirectionsRenderer directions={this.state.directions} /> : null}


              </GoogleMap>
              }
            />
          </div>);
    }
    return (<h2> <br/><br/>Loading... </h2>)
  }

};
