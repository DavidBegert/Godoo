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
              showButton={true}
              location={this.props.location}
              date={this.props.date}
              switchPage={this.props.switchPage}
              handleGeolocationPress={this.props.handleGeolocationPress}
              handleNewParams={this.props.handleNewParams}
              setAddress={this.props.setAddress}
              address={this.props.address}
            />
            <div>

            </div>
            { (this.props.showLoadingGifHome) && <img id="homepage-gif" src="https://67.media.tumblr.com/tumblr_mdkoyttBGV1rgpyeqo1_500.gif" />}
          </div>
        </div>
      </section>
    );
  }

}