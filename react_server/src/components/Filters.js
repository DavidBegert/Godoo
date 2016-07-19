import React, { Component } from 'react';
import FilterButton from './FilterButton';

export default class Filters extends Component {
  render() {
    return (
      <div className="button-area on-the-map"> 
        <FilterButton category_name="Comedy" category_id="comedy" onFilterClick={this.props.onFilterClick}/>
        <br />
        <FilterButton category_name="Festivals" category_id="festivals_parades" onFilterClick={this.props.onFilterClick}/>
        <br />
        <FilterButton category_name="Dining" category_id="Food" onFilterClick={this.props.onFilterClick}/>
        <br />
        <FilterButton category_name="Concerts" category_id="music" onFilterClick={this.props.onFilterClick}/>
        <br />
        <FilterButton category_name="Family" category_id="family_fun_kids" onFilterClick={this.props.onFilterClick}/>
        <br />
        <FilterButton category_name="Sports" category_id="sports" onFilterClick={this.props.onFilterClick} />
        <br />
      </div> 
    );
  }
}  