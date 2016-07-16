import React, { Component } from 'react';

export default class Nav extends Component {

  render() {
    return (
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item logo" href="#">
            <strong>GoDoo</strong>
          </a>
        </div>

        <div className="nav-right nav-menu">
          <a className="nav-item" href="#">
            Explore
          </a>
          <a className="nav-item" href="#">
            Blog
          </a>

          <span className="nav-item">
            <a className="button is-primary" href="#">
              <span>Contact us</span>
            </a>
          </span>
        </div>
      </nav>
    );
  }
}  

