import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import FilterList from "./FilterList";
import $ from "jquery";

export default class GoogleMapContent extends Component {

// DONE : stripped html tags from description
//TO DO : add whitespace in place of removed html tags

  constructor(props) {
    super(props);
    console.log("hi david")
    this.state = {
      previousMarker: null
    }
  }

  onMarkerClick(marker) {
    if (!marker.showInfo) {
      this.props.handleMapMarkerClick(marker);
      marker.showInfo = true;
      if (this.state.previousMarker && this.state.previousMarker != marker){ 
        this.state.previousMarker.showInfo = false;
      }
      this.state.previousMarker = marker;
    } else {
      marker.showInfo = false;
    }
    this.setState(this.state);
  };

  renderInfoWindow(marker) {
    return (
      <InfoWindow onCloseclick={() => this.onMarkerClick(marker)} > 
        <div style={{width: "500px", maxHeight: "100px"}}>
          <strong>{marker.title}:</strong>
          <p>{$('<div>' + marker.description + '</div>').text()}</p>
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
                    //icon={"https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300"}
                    //visible={false}
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
