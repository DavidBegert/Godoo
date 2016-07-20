import React, { Component } from 'react';
import SearchForm from './SearchForm';

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
            <SearchForm 
              makeCall={this.props.makeCall} 
              showButton={true} 
              currentPosition={this.props.currentPosition}
              today={this.props.today}
              switchPage={this.props.switchPage}
            />
            <div>
              <button onClick={() => this.props.handleGeolocationPress()}> Use My Current Location </button>
            </div>
            { (this.props.showLoadingGif) && <img id="homepage-gif" src="https://67.media.tumblr.com/tumblr_mdkoyttBGV1rgpyeqo1_500.gif" />}
          </div>
        </div>
      </section>
    );
  }

}