import React, { Component } from 'react';
import Hero from './Hero';
import InfoSection from './InfoSection';
import SearchForm from './SearchForm';

export default class HomePage extends Component {

  render() {
    return(
      <div>
        <Hero />
        <InfoSection />
        <SearchForm />
        <button onClick={this.props.switchPage}> Switch page </button>
      </div>
    );
  }

}