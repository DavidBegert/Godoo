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
    console.log('handling get started press from hero.js')
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
      console.log("BABABABBABABAM");
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
              today={this.props.today}
            />
            { (this.state.showWarning) && <p className='warning'> The City And Date Need To Be Filled In </p> }
          </div>
        </div>
      </section>
    );
  }

}