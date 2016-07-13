import React, { Component } from 'react';

export default class EventCard extends Component {

  render() {
    return (

      <div className="column is-one-third space_edit">
          <div className="box1">
            <div className="box space_edit2">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src="images/surfer_girl_chilled.jpg" alt="Image"/>
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small> -->
                      <strong>P and E Summer Concerts</strong> <small>@pandefair</small> <small>31m</small>
                      <br />
                      Every night at 8:30pm, the PNE Amphitheatre will present a summer full of the best music! Don't miss the sounds of Canada's-own, Juno-award winning The Sheepdogs! 
                    </p>
                  </div>
                  <nav className="level">
                    <div className="level-left">
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-reply"></i></span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-heart"></i></span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>
    );
  }
}  