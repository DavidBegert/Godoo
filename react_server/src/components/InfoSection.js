import React, { Component } from 'react';

export default class InfoSection extends Component {

  render() {
    return (
       <section className="section is-medium ">
        <div className="container">
        <div className="heading how-it-works-headings">
          <h1 className="title">How it works</h1>
        </div>
        <br />
        <br />
          <div className="columns" id="how-it-works-images">
            <div className="column is-4 ">
              <img src="/src/images/phone_in_the_country copy.jpg"/>
              <br />
              <p><strong>Browse Events</strong></p>
              <br />
              <p> We bring together a variety of events recommended by industry experts</p>
            </div>
            <div className="column is-4">
              <img src="/src/images/man_photos_city copy.jpeg"/>
              <br />
              <p><strong>Create an Itinerary</strong></p>
              <br />
              <p> Select your favourite events and create an itinerary for you and your friends</p>
            </div>
            <div className="column is-4">
              <img src="/src/images/on_the_beach copy.jpg"/>
              <br />
              <p><strong>Enjoy your experience</strong></p>
              <br />
              <p> Meet new people, try new things and enjoy all the city has to offer</p>
            </div>
          </div>
          
        </div>
    </section>
    );
  }

}