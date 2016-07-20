import React, { Component } from 'react';

export default class EventCard extends Component {

  componentDidMount() {
    var eventCard = document.getElementById(this.props.id);
    eventCard.addEventListener('mouseenter', function() {
      this.props.handleEventCardMouseEnter(this.props.id);
    }.bind(this))
  }

  componentWillUnmount() {
    // TODO: unbind the mouseenter event here
  }


  render() {
    return (
      // Removed 1/3 width bulma class
      // TODO : Jazz it up with bulma css.
      <div id={this.props.id} onClick={(e) => { e.stopPropagation(); this.props.onEventCardClick(this.props.id)} }>
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
                    <em>{this.props.start_time}</em>
                    <br />
                    <em>{this.props.venue_address}</em>
                    <br />
                    <br />
                    {this.props.description}
                    <br />
                  </p>

                  <nav className="level">
                    <div className="level-left">
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-calendar"></i></span>
                      </a>
                      <a className="level-item">
                        <span className="icon is-small"><i className="fa fa-ticket"></i></span>
                      </a>
                    </div>
                  </nav>
                  
                  
                </div>

              </div>
              <div className="media-right">
                <button className="delete" onClick={()=>this.props.deselectEvent(this.props.id)}>x</button>
              </div>
            </article>
          </div>
        </div>

      </div>

    );
  }
}  