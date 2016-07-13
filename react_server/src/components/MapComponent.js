import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import $ from "jquery";

export default class GoogleMapContent extends Component {

//TO DO : stop markers from being centered when clicked. figure out how to change width of infoboxes

  constructor(props) {

    super(props);
    this.state = {
    
      //array of objects of markers
      markers: [
        {
          position: { lat: 48.0112183, lng: -124.52067570000001 },
          key: 0,
          defaultAnimation: 2,
          title: "This is the title",
          showInfo: false,
          options: {
            description: "The Shop is a concert hall event where you will be watching something cool!!!"
          }
        },
        {
          position: {lat: 49, lng: -125},
          key: 1,
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

  // componentDidMount() {
  //   var that = this; 
  //   $.ajax({
  //     url: 'http://api.eventful.com/json/events/search',
  //     dataType: 'jsonp',
  //     data: {
  //       location: "49.2788,-123.1139",
  //       app_key: 'FFmssWtvRRfc9VF7',
  //       page_size: 100,
  //       date: "Today",
  //       within: 1,
  //       change_multi_day_start: true,
  //       ex_category: 'learning_education,schools_alumni,conference,community,family_fun_kids,clubs_associations',
  //       category: 'comedy,food,music,festivals_parades,movies_film,fundraisers,art,support,holiday,books,attractions,business,singles_social,outdoors_recreation,performing_arts,animals,politics_activism,sales,science,religion_spirituality,sports,technology,other',
  //     },
  //     success: function(response) {
  //       var results = response.events.event;
  //       console.log(results);
  //       // var arr = Object.keys(results).map(function(k) { return results[k] });
  //       // console.log('array: ');
  //       // console.log(arr[0])
  //       that.setState({ data: arr });
  //     }
  //   });
  // };

  handleMarkerClick(marker) {
    if (marker.showInfo === false) {
      marker.showInfo = true;
    } else {
      marker.showInfo = false;
    }
    this.setState(this.state); 
  };

  renderInfoWindow(marker) {
    return (
      <InfoWindow> 
        {marker.options.description}  
      </InfoWindow>
      
    );
    
  };

  render() {
    if (this.state.markers) {  
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
                defaultZoom={7}
                defaultCenter={{ lat: 48.363882, lng: -125.044922 }}
              >
              {console.log(this.state)}
              {this.state.markers.map((marker, index) => {
                return (
                  <Marker
                    key={index}
                    position={marker.position }
                    title={marker.title}
                    onClick={() => this.handleMarkerClick(marker)}
                    onMouseover={function(e) { console.log('mousedOver') } }
                  > 
                    { console.log("hello the marker got rendered") }
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
        <h2> Loading... </h2>
      );
    }
  }

};
