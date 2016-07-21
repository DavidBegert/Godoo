import React, { Component } from 'react';
import Nav from './Nav';
import Hero from './Hero';
import InfoSection from './InfoSection';

export default class HomePage extends Component {

  constructor(props) {
    super();
  }
  render() {
    return(
      <div>
        <Nav />
        <Hero 
          switchPage={this.props.switchPage} 
          handleGeolocationPress={this.props.handleGeolocationPress}
          location={this.props.location}
          showLoadingGifHome={this.props.showLoadingGifHome}
          date={this.props.date}
          handleNewParams={this.props.handleNewParams}
          setAddress={this.props.setAddress}
          address={this.props.address}
        />
        <InfoSection />
      </div>
    );
  }

}