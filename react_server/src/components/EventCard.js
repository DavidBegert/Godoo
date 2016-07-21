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
                      <a className="level-item" href= {"https://calendar.google.com/calendar/render?action=TEMPLATE&text="+ this.props.title +"&dates=20160721T200000Z/20160721T240000Z&details=" + this.props.description +"&location=" + this.props.venue_address  +"&sf=true&output=xml#eventpage_6"} >
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

      // {"https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + this.props.title +  "&dates=" + this.props.start_time + "&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml#eventpage_6"}

      

      //calendar.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Name&dates=20140127T224000Z/20140320T221500Z&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml#eventpage_6
  

    );
  }
}  