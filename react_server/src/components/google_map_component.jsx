import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default function GoogleMapComponent (props) {

    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...props.containerElementProps}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => console.log(map)}
              defaultZoom={8}
              defaultCenter={{ lat: 48.363882, lng: -125.044922 }}
              // onClick={props.onMapClick}
            >
            {props.markers.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onClick={function(e) { console.log(this.title) } } 
                />
              );
            })}

            </GoogleMap>
          }
        />
      </section>
    );

};
