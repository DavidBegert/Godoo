import React, { Component } from 'react';
import FilterItem from './components/FilterItem';

export default class FilterList extends Component {

  render() {
    return (

      <div class="column is-one-third space_edit">

        <div className="button-area"> 

              <a className="button is-primary">Comedy</a>
              <br />
              <a className="button is-primary">Festivals</a>
              <br />
              <a className="button is-primary">Dining</a>
              <br />
        
              <br />
              <a className="button is-primary">Concerts</a>
              <br />
              <a className="button is-primary">Family</a>
              <br />
              <a className="button is-primary">Sports</a>
    
        </div> 
      </div>  


    );
  }
}  