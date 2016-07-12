import React from 'react';

export default class Nav extends React.Component {

  render() {
    return (
        // <nav> Nav </nav>
      <nav className="nav">
        <div className="nav-left">
          <a className="nav-item" href="#">
            <img className="logo" src="images/godoo_pre-04.jpg" alt="Godoo" />
          </a>
          <a className="nav-item" href="#">
            <input type="text" placeholder="Vancouver"></input>
          </a>
        </div>

        <div className="nav-center">
          <a className="nav-item" href="#">
            <span className="icon">
              <i className="fa fa-github"></i>
            </span>
          </a>
          <a className="nav-item" href="#">
            <span className="icon">
              <i className="fa fa-twitter"></i>
            </span>
          </a>
        </div>

        <span className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <div className="nav-right nav-menu">
          <a className="nav-item" href="#">
            Home
          </a>
          <a className="nav-item" href="#">
            Documentation
          </a>
          <a className="nav-item" href="#">
            Blog
          </a>

          <span className="nav-item">
            <a className="button" >
              <span className="icon">
                <i className="fa fa-twitter"></i>
              </span>
              <span>Tweet</span>
            </a>
            <a className="button is-primary" href="#">
              <span className="icon">
                <i className="fa fa-download"></i>
              </span>
              <span>Download</span>
            </a>
          </span>
        </div>
      </nav>
      );
  }
}  

