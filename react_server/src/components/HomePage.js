import React, { Component } from 'react';
import Hero from './Hero';
import InfoSection from './InfoSection';

export default class HomePage extends Component {

  constructor(props) {
    super();
  }
  render() {
    return(
      <div>
        <Hero makeCall={this.props.makeCall} switchPage={this.props.switchPage} />
        <InfoSection />
      </div>
    );
  }

}