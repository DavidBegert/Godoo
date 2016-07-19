import React, { Component } from 'react';

export default class EventCard extends Component {
  componentDidMount() {
    console.log("eventcard mounted");
    var eventCard = document.getElementById(this.props.id);
    eventCard.addEventListener('mouseenter', function() {
      console.log("mouse has entered!!");
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
                    {this.props.description}
                    <br />
                    {this.props.venue_address}
                    <br />
                    {this.props.start_time}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

      </div>

    );
  }
}  