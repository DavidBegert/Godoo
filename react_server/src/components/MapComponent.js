import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";

export default class GoogleMapContent extends Component {

  constructor(props) {

    super(props);
    this.state = {
      //array of objects of markers
      markers: [
        {
          position: { lat: 48.0112183, lng: -124.52067570000001 },
          key: "The Shop",
          defaultAnimation: 2,
          title: "This is the title",
          showInfo: false,
          options: {
            description: "The Shop is a concert hall event where you will be watching something cool!!!"
          }
        },
        {
          position: {lat: 49, lng: -125},
          key: "Vancouver",
          defaultAnimation: 3,
          title: "Theatre",
          showInfo: false,
          options: {
            description: "This is the vancouver theatre and may be the funnest place ever."
          }
        }
      ]
    }
  }

  handleMarkerClick(marker) {
    if (marker.showInfo === false) {
      marker.showInfo = true;
    } else {
      marker.showInfo = false;
    }
    this.setState(this.state); 
  }
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  renderInfoWindow(marker) {
    return (
      <InfoWindow>
        {marker.options.description}
      </InfoWindow>
      
    );
    
  }

  render() {

    return (
      <div className='column is-two-thirds' style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }} > 
            </div>
          }
          googleMapElement={
            <GoogleMap
              ref='map'
              defaultZoom={7}
              center={{ lat: 48.363882, lng: -125.044922 }}
            >

            {this.state.markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => this.handleMarkerClick(marker)}
                  onMouseover={function(e) { console.log('mousedOver') } }
                > 
                  { console.log("hello") }
                  { marker.showInfo ? this.renderInfoWindow(marker) : null }

                </Marker>
              );
            })
            }

            </GoogleMap>
          }
        />
      </div>
    );
  }

};
