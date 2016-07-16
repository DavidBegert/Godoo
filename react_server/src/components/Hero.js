import React, { Component } from 'react';

export default class Hero extends Component {

  render() {
    return (
      <section className="hero is-large">
        <div className="hero-body hero-pic">
         <div className="container city-heading">
          <h1 className="title hero-title">
            Discover events around the city
            </h1>
            <br />
            <br />
            <input className="input input-city" type="text" placeholder="Enter a city"></input>
            <input className="input input-date" type="date" placeholder="Pick a date"></input>
            <button className="button get-started">
              Get Started
            </button>
           </div>
         </div>
      </section>
    );
  }

}