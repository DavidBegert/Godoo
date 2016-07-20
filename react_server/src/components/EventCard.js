import React, { Component } from 'react';

export default class EventCard extends Component {
  componentDidMount() {
    var eventCard = document.getElementById(this.props.id);
    eventCard.addEventListener('mouseenter', function() {
      this.props.handleEventCardMouseEnter(this.props.id);
    }.bind(this))
  }

  render() {
    return (
      // Removed 1/3 width bulma class
      // TODO : Jazz it up with bulma css.
      <div id={this.props.id}>
        <div className="box1">
          <div className="box space_edit2">
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src={this.props.image_url} alt="Image"/>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{this.props.title}</strong>
                    <br />
                    <em>{this.props.venue_name}</em>
                    <br />
                    <br />
                    {this.props.description}
                    <br />
                    {this.props.venue_address}
                    <br />
                    <br />
                    <em>{this.props.start_time}</em>
                  </p>
                </div>
              </div>
              <div className="media-right">
                <button className="delete">x</button>
              </div>
            </article>
          </div>
        </div>

      </div>

    );
  }
}  