import React, { Component } from 'react';

export default class Filters extends Component {

  render() {
    return (
      <div className="button-area"> 

        <a className="button is-primary" onClick={() => {this.props.onFilterClick('comedy')}}>Comedy</a>
        <br />
        <a className="button is-primary" onClick={() => {this.props.onFilterClick('festivals_parades')}}>Festivals</a>
        <br />
        <a className="button is-primary" onClick={() => {this.props.onFilterClick('food')}}>Dining</a>
        <br />
  
        <br />
        <a className="button is-primary" onClick={() => {this.props.onFilterClick('music')}}>Concerts</a>
        <br />
        <a className="button is-primary" onClick={() => {this.props.onFilterClick('family_fun_kids')}}>Family</a>
        <br />
        <a className="button is-primary" onClick={() => {this.props.onFilterClick('sports')}}>Sports</a>

      </div> 
    );
  }
}  