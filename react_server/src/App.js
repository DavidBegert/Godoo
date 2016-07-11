import React, { Component } from 'react';
import Nav from './Nav';

export default class App extends Component {

  constructor(props) {
    console.log('hello');
    super(props);
  }

  render() {
    return (
      <div>
         <Nav/>
         <h1> Welcome to react baby! </h1>
      </div>
      
    );
  }


}