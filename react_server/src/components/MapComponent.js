import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import Filters from "./Filters";
import $ from "jquery";

export default class GoogleMapContent extends Component {

//TO DO : if it has no description then make it say <no description> or something. Also make the description render as html since there are br tags right now.

  constructor(props) {
    super(props);
    console.log("hi david")
    this.state = {
      previousMarker: null
    }
  }

  onMarkerClick(marker) {
    if (!marker.showInfo) {
      marker.showInfo = true;
      if (this.state.previousMarker && this.state.previousMarker != marker){ 
        this.state.previousMarker.showInfo = false;
      }
      this.state.previousMarker = marker;
    } else {
      marker.showInfo = false;
    }
    this.props.handleMapMarkerClick(marker);
  };

  renderInfoWindow(marker) {
    return (
      <InfoWindow onCloseclick={() => this.onMarkerClick(marker)} > 
        <div style={{width: "500px", maxHeight: "100px"}}>
          <strong>{marker.title}:</strong>

          <p>{marker.description}</p>
        </div> 
      </InfoWindow>
      
    );
    
  };

  render() {
    if (this.props.events) {  
      return (
          <GoogleMapLoader
            containerElement={
              <div
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
                defaultCenter={{ lat: 49.275882, lng: -123.114922 }}
              >

              {this.props.events.map((marker, index) => {  //this.state.markers.map
  
                return (
                  <Marker
                    key={index}
                    position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) } } //marker.position
                    title={ marker.title }//marker.title
                    onClick={() => this.onMarkerClick(marker)} 
                    // onMouseover={() => this.onMarkerClick(marker) }
                    // onMouseleave={() => this.handleMarkerLeave(marker) }
                  > 

                    { marker.showInfo ? this.renderInfoWindow(marker) : null }

                  </Marker>
                );
              })
              }

              </GoogleMap>
            }
          />
      );
    }
    else {
      return (
        <h2> <br/><br/>Loading... </h2>
      );
    }
  }

};
