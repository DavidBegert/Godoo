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
          showLoadingGif={this.props.showLoadingGif}
          date={this.props.date}
          handleNewParams={this.props.handleNewParams}
        />
        <InfoSection />
      </div>
    );
  }

}