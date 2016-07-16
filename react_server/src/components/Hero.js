import React, { Component } from 'react';

export default class Hero extends Component {

  render() {
    return (
      <section className="hero is-large">
        <div class="hero-body hero-pic">
         <div class="container city-heading">
          <h1 class="title hero-title">
            Discover events around the city
            </h1>
            <br />
            <br />
            <input class="input input-city" type="text" placeholder="Enter a city"></input>
            <input class="input input-date" type="date" placeholder="Pick a date"></input>
            <button class="button get-started">
              Get Started
            </button>
           </div>
         </div>
      </section>
    );
  }

}