import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import FilterList from "./FilterList";
import $ from "jquery";

export default class GoogleMapContent extends Component {

//TO DO : if it has no description then make it say <no description> or something. Also make the description render as html since there are br tags right now.

  constructor(props) {

    super(props);
    this.state = {
      previousMarker: null
    }
  }

  componentDidMount() {
    var that = this; 
    $.ajax({
      url: 'http://api.eventful.com/json/events/search',
      dataType: 'jsonp',
      data: {
        location: "49.2788,-123.1139",
        app_key: 'FFmssWtvRRfc9VF7',
        page_size: 100,
        date: "Today",
        within: 1,
        change_multi_day_start: true,
        ex_category: 'learning_education,schools_alumni,conference,community,family_fun_kids,clubs_associations',
        category: 'comedy,food,music,festivals_parades,movies_film,fundraisers,art,support,holiday,books,attractions,business,singles_social,outdoors_recreation,performing_arts,animals,politics_activism,sales,science,religion_spirituality,sports,technology,other',
      },
      success: function(response) {
        var results = response.events.event;
        console.log(results);
        that.setState({ data: results });
      }
    });
  };

  handleMarkerClick(marker) {
    if (!marker.showInfo) {
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
      <InfoWindow onCloseclick={() => this.handleMarkerClick(marker)} > 
        <div style={{width: "550px"}}>
          <strong>{marker.title}:</strong>

          <p>{marker.description}</p>
        </div> 
      </InfoWindow>
      
    );
    
  };

  render() {
    if (this.state.data) {  
      return (
        <div className='column is-two-thirds' style={{height: "100%"}}>
          {console.log("helllllooooo the whole map just got rendered")}
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
                defaultZoom={13}
                defaultCenter={{ lat: 49.275882, lng: -123.114922 }}
              >

              {this.state.data.map((marker, index) => {  //this.state.markers.map
  
                return (
                  <Marker
                    key={index}
                    position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) } } //marker.position
                    title={ marker.title }//marker.title
                    onClick={() => this.handleMarkerClick(marker)} 
                    // onMouseover={() => this.handleMarkerClick(marker) }
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
        </div>
      );
    }
    else {
      return (
        <h2> <br/><br/>Loading... </h2>
      );
    }
  }

};
