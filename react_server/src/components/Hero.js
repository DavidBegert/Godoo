import React, { Component } from 'react';
import SearchForm from './SearchForm';

export default class Hero extends Component {

  constructor(props) {
    super();
    this.state = {
      cityAndDateFilledIn: false,
      showWarning: false
    }
  }
  
  handleGetStartedPress() {
    if (this.state.cityAndDateFilledIn) {
      this.props.switchPage();
    } else {
      this.setState({showWarning: true})
    }
  }

  isTheCityAndDateFilledIn(place, date) {
    if (place && date) {
      this.setState({cityAndDateFilledIn: true});
    } else {
      this.setState({cityAndDateFilledIn: false});
    }
  }

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
              isTheCityAndDateFilledIn={this.isTheCityAndDateFilledIn.bind(this)} 
              handleGetStartedPress={this.handleGetStartedPress.bind(this)}
              showButton={true} 
              currentPosition={this.props.currentPosition}
              today={this.props.today}
            />
            <div>
              <button onClick={() => this.props.handleGeolocationPress()}> Use My Current Location </button>
              { (this.state.showWarning) && <p className='warning'> The City And Date Need To Be Filled In </p> }
            </div>
            { (this.props.showLoadingGif) && <img id="homepage-gif" src="https://67.media.tumblr.com/tumblr_mdkoyttBGV1rgpyeqo1_500.gif" />}
          </div>
        </div>
      </section>
    );
  }

}