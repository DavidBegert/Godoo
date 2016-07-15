import React, { Component } from 'react';
import Hero from './Hero';
import InfoSection from './InfoSection';
import SearchForm from './SearchForm';

export default class HomePage extends Component {

  constructor(props) {
    super();
  }
  render() {
    return(
      <div>
        <Hero />
        <InfoSection />
        <SearchForm makeCall={this.props.makeCall}/>
        <button onClick={this.props.switchPage}>Show me Events!</button>
      </div>
    );
  }

}